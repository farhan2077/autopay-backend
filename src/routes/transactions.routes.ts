import express = require("express");
const transactionRouter = express.Router();

import {
  getAllTransactionsController,
  getUserTransactionController,
  addTransactionController,
} from "../controllers";

// baseUrl/transactions
transactionRouter
  .route("/")
  .get(getAllTransactionsController)
  .post(addTransactionController);

transactionRouter.route("/:vehicleId").get(getUserTransactionController);

export default transactionRouter;
