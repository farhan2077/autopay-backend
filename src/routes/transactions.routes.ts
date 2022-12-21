import express = require("express");
const transactionRouter = express.Router();

import {
  getAllTransactionsController,
  addTransactionController,
  deleteTransactionController,
} from "../controllers";

// baseUrl/transactions
transactionRouter
  .route("/")
  .get(getAllTransactionsController)
  .post(addTransactionController)
  .delete(deleteTransactionController);

export default transactionRouter;
