import { DataSource } from "typeorm";

import { User, Transaction } from "../entities";

export const datasource = new DataSource({
  type: "sqlite",
  database: "./db/sqlite",
  entities: [User, Transaction],
  logging: true,
  synchronize: true,
});
