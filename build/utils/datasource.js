"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datasource = void 0;
var typeorm_1 = require("typeorm");
var entities_1 = require("../entities");
exports.datasource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "./db/sqlite",
    entities: [entities_1.User, entities_1.Transaction],
    logging: ["error", "schema"],
    logger: "advanced-console",
    synchronize: true,
});
