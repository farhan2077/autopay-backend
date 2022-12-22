import express = require("express");
const userRouter = express.Router();

import {
  getAllUsersController,
  getUserController,
  getUserTransactionController,
  addUserController,
  updateUserController,
  deleteUserController,
} from "../controllers";

// baseUrl/users
userRouter.route("/").get(getAllUsersController).post(addUserController);

// baseUrl/vehicles/:userId
userRouter
  .route("/:userId")
  .get(getUserController)
  .put(updateUserController)
  .delete(deleteUserController);

userRouter.route("/transaction/:vehicleId").get(getUserTransactionController);

export default userRouter;
