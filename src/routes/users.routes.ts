import express = require("express");
const userRouter = express.Router();

import {
  getAllUsersController,
  getUserController,
  addUserController,
  updateUserController,
  updateUserBalanceController,
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

// baseUrl/user/balance/update
userRouter.route("/balance/update").patch(updateUserBalanceController);

export default userRouter;
