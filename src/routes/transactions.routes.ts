import express = require("express");
const transactionRouter = express.Router();

import {
  getAllTransactionsController,
  getTransactionController,
  addTransactionController,
  deleteTransactionController,
} from "../controllers";

// baseUrl/transactions
transactionRouter
  .route("/")
  .get(getAllTransactionsController)
  .post(addTransactionController);

transactionRouter
  .route("/:id")
  .get(getTransactionController)
  .delete(deleteTransactionController);

export default transactionRouter;
