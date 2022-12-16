import express = require("express");
const usersRouter = express.Router();

import {
  getAllUsersController,
  addUserController,
  deleteUserController,
} from "../controllers";

// baseUrl/users
usersRouter.route("/").get(getAllUsersController).post(addUserController);

// baseUrl/users/:userId
usersRouter.route("/:userId").delete(deleteUserController);

export default usersRouter;
