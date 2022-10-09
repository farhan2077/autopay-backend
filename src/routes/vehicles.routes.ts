import express = require("express");
const vehiclesRouter = express.Router();

import {
  getAllVechilesController,
  createVehicleController,
} from "../controllers";

// baseUrl/vehicles - @GET, @POST
vehiclesRouter
  .route("/")
  .get(getAllVechilesController)
  .post(createVehicleController);

export default vehiclesRouter;
