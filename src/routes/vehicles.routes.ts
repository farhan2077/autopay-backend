import express = require("express");
const vehiclesRouter = express.Router();

import {
  getAllVechilesController,
  getVehicleController,
  createVehicleController,
  updateVehicleController,
  deleteVehicleController,
} from "../controllers";

// baseUrl/vehicles - @GET, @POST
vehiclesRouter
  .route("/")
  .get(getAllVechilesController)
  .post(createVehicleController);

// baseUrl/vehicles - @PUT
vehiclesRouter
  .route("/:vehicleId")
  .get(getVehicleController)
  .put(updateVehicleController)
  .delete(deleteVehicleController);
export default vehiclesRouter;
