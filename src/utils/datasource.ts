import { DataSource } from "typeorm";

import { User, Transaction, Vehicle } from "../entities";

export const datasource = new DataSource({
  type: "sqlite",
  database: "./db/sqlite",
  entities: [User, Transaction, Vehicle],
  logging: true,
  synchronize: true,
});
