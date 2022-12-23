import express = require("express");
const transactionRouter = express.Router();

import {
  getAllTransactionsController,
  getTransactionController,
  addTransactionController,
} from "../controllers";

// baseUrl/transactions
transactionRouter
  .route("/")
  .get(getAllTransactionsController)
  .post(addTransactionController);

transactionRouter.route("/:vehicleId").get(getTransactionController);

export default transactionRouter;
