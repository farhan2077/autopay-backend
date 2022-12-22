import express = require("express");
const transactionRouter = express.Router();

import {
  getAllTransactionsController,
  addTransactionController,
} from "../controllers";

// baseUrl/transactions
transactionRouter
  .route("/")
  .get(getAllTransactionsController)
  .post(addTransactionController);

export default transactionRouter;
