import express = require("express");
const userRouter = express.Router();

import {
  getAllUsersController,
  getUserController,
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

export default userRouter;
