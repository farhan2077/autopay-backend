"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var transactionRouter = express.Router();
var controllers_1 = require("../controllers");
// baseUrl/transactions
transactionRouter
    .route("/")
    .get(controllers_1.getAllTransactionsController)
    .post(controllers_1.addTransactionController);
transactionRouter.route("/:vehicleId").get(controllers_1.getTransactionController);
exports.default = transactionRouter;
