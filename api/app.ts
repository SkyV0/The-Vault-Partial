import "express-async-errors";

import path from "path";


import express, { Request, Response } from "express";


import cors from "cors";

import {json, urlencoded } from "body-parser";
var bodyParser = require('body-parser');

import initKibblesRouter from "./routes/kibbles";
import initKittyItemsRouter from "./routes/kitty-items";
import initMarketRouter from "./routes/market";
import { KibblesService } from "./services/kibbles";
import { KittyItemsService } from "./services/kitty-items";
import { MarketService } from "./services/market";

//import { createProxyMiddleware } from 'http-proxy-middleware';

const V1 = "/v1/";

// Init all routes, setup middlewares and dependencies
const initApp = (
  kibblesService: KibblesService,
  kittyItemsService: KittyItemsService,
  marketService: MarketService
) => {
  const app = express();

  // @ts-ignore
  app.use(cors({origin:['https://git.heroku.com/nftvault.git']}));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(V1, initKibblesRouter(kibblesService)); 
  app.use(V1, initKittyItemsRouter(kittyItemsService));
  app.use(V1, initMarketRouter(marketService));

  
    
const serveReactApp = () => {

  app.use(express.static(path.resolve(__dirname, "../../web/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../../web/build/index.html"));
  });
  console.log("Connected!");
}; 

if (process.env.IS_HEROKU) {
  console.log("Connected here!");
  // Serve React static site using Express when deployed to Heroku.
  serveReactApp();
}

app.all("*", async (req: Request, res: Response) => {
  return res.sendStatus(404);
});



  return app;
};

export default initApp;
