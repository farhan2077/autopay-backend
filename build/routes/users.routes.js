"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var userRouter = express.Router();
var controllers_1 = require("../controllers");
// baseUrl/users
userRouter.route("/").get(controllers_1.getAllUsersController).post(controllers_1.addUserController);
// baseUrl/vehicles/:userId
userRouter
    .route("/:userId")
    .get(controllers_1.getUserController)
    .put(controllers_1.updateUserController)
    .delete(controllers_1.deleteUserController);
// baseUrl/user/balance/update
userRouter.route("/balance/update").patch(controllers_1.updateUserBalanceController);
exports.default = userRouter;
