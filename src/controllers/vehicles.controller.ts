import express = require("express");
import { datasource } from "../utils/datasource";
import { Vehicle } from "../entities";

// @GET - baseUrl/vehicles
// get all vehicles
export async function getAllVehicles(
  req: express.Request,
  res: express.Response
) {
  try {
    const vehiclesRepository = datasource.getRepository(Vehicle);

    const vehicles = await vehiclesRepository.find({
      select: ["id", "vehicleType", "tollRate"],
      // relations: ["user"],
    });

    return res.status(200).json({
      success: true,
      message: "All vehicles info found",
      data: vehicles,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Error fetching all vehicles!",
    });
  }
}

// @POST - baseUrl/vehicles
// add vehicle
export async function createVehicle(
  req: express.Request,
  res: express.Response
) {
  try {
    const { vehicleType, tollRate } = req.body;

    const vehiclesRepository = datasource.getRepository(Vehicle);
    // const previousEntry = await vehiclesRepository.findOne(vehicleType);

    const newVehicle = new Vehicle();

    newVehicle.vehicleType = vehicleType;
    newVehicle.tollRate = tollRate;

    await vehiclesRepository.save(newVehicle);

    return res
      .status(200)
      .json({ success: true, message: "New vehicle added!", data: newVehicle });

    // if (!previousEntry) {
    //   const newVehicle = new Vehicle();

    //   newVehicle.vehicleType = vehicleType;
    //   newVehicle.tollRate = tollRate;

    //   await vehiclesRepository.save(newVehicle)
    // } else {
    //   return res
    //     .status(400)
    //     .json({ success: false, error: "Vehicle already exists!" });
    // }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Error adding new vehicle!",
    });
  }
}
