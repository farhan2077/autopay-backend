import express = require("express");
const transactionRouter = express.Router();

import {
  getAllTransactionsController,
  getTransactionController,
  addTransactionController,
  getLastTransactionStatusOfUserController,
} from "../controllers";

// baseUrl/transactions
transactionRouter
  .route("/")
  .get(getAllTransactionsController)
  .post(addTransactionController);

transactionRouter.route("/:vehicleId").get(getTransactionController);

transactionRouter.route("/last").get(getLastTransactionStatusOfUserController);

export default transactionRouter;
