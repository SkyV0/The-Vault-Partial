import * as fcl from "@onflow/fcl";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import initApp from "./app";
import { getConfig } from "./config";
import initDB from "./db";

import { BlockCursorService } from "./services/block-cursor";
import { FlowService } from "./services/flow";
import { KibblesService } from "./services/kibbles";
import { KittyItemsService } from "./services/kitty-items";
import { MarketService } from "./services/market";
import { SaleOfferHandler } from "./workers/sale-offer-handler";

const argv = yargs(hideBin(process.argv)).argv;

if (process.env.NODE_ENV !== "production") {
  const env = require("dotenv");
  const expandEnv = require("dotenv-expand");
  env.config({
    path: "./.env.local",
  });
  expandEnv(env);
}

async function run() {
  const config = getConfig();
  const db = initDB(config);

  // Make sure to disconnect from DB when exiting the process
  process.on("SIGTERM", () => {
    db.destroy().then(() => {
      process.exit(0);
    });
  });

  // Run all database migrations
  await db.migrate.latest();

  const flowService = new FlowService(
    config.minterAddress,
    config.minterPrivateKeyHex,
    config.minterAccountKeyIndex
  );

  const marketService = new MarketService(
    flowService,
    config.fungibleTokenAddress,
    config.minterAddress,
    config.nonFungibleTokenAddress,
    config.minterAddress,
    config.minterAddress
  );

  // Make sure we're pointing to the correct Flow Access API.
  fcl.config().put("accessNode.api", config.accessApi);

  const startWorker = () => {
    console.log("Starting Flow event worker ....");
    const blockCursorService = new BlockCursorService();

    const saleOfferWorker = new SaleOfferHandler(
      marketService,
      blockCursorService,
      flowService
    );

    saleOfferWorker.run();
  };
  
  const startAPIServer = () => {
    console.log("Starting API server ....");

    const kibblesService = new KibblesService(
      flowService,
      config.fungibleTokenAddress,
      config.minterAddress
    );

    const kittyItemsService = new KittyItemsService(
      flowService,
      config.nonFungibleTokenAddress,
      config.minterAddress
    );

    const app = initApp(kibblesService, kittyItemsService, marketService);

    app.listen(config.port, () => {
      console.log(`Listening on port ${config.port}!`);
    });
  };

  if (argv.dev) {
    // If we're in dev, run everything in one process.
    console.log("In dev!");
    startWorker();
    startAPIServer();
    return;
  } else if (argv.worker){
    // If we're not in dev, look for flags. We do this so that
    // the worker can be started in seperate process using flag.
    // eg:
    // $> node /api/dist/index.js (starts API server)
    // $> node /api/dist/index.js --worker (starts worker)
    //if (argv.worker) {
      // Start the worker only if worker is passed as as command flag.
      // See above notes for why.
      console.log("In production!"); 
      startWorker();
    } else {
      // Default when not in dev: start the API server.
      startAPIServer();
    }
}

const redOutput = "\x1b[31m%s\x1b[0m";

run().catch((e) => {
  console.error(redOutput, e);
  process.exit(1);
});
