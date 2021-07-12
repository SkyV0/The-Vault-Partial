import { BaseModel } from "./base";

class IpfsTable extends BaseModel {
  ipfs_hash!: string;
  static get tableName() {
    return "ipfs-table";
  }
}

export { IpfsTable };