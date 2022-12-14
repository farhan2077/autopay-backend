import express = require("express");
import { datasource } from "../utils/datasource";
import { Vehicle } from "../entities";

// @GET - baseUrl/vehicles
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

// @GET - baseUrl/vehicles/:vehiclesId
export async function getVehicle(req: express.Request, res: express.Response) {
  const vehicleId = req.params.vehicleId;

  try {
    const vehiclesRepository = datasource.getRepository(Vehicle);

    const vehicle = await vehiclesRepository.findOneBy({
      id: vehicleId,
    });

    if (!vehicle) {
      return res
        .status(400)
        .json({ success: false, error: "Vehicle not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle info found",
      data: vehicle,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Error getting vehicle info!",
    });
  }
}

// @POST - baseUrl/vehicles
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

// @PUT - baseUrl/vehicles/:vehicleId
export async function updateVehicle(
  req: express.Request,
  res: express.Response
) {
  const vehicleId = req.params.vehicleId;

  try {
    const { vehicleType, tollRate } = req.body;
    const vehiclesRepository = datasource.getRepository(Vehicle);

    const vehicle = await vehiclesRepository.findOneBy({
      id: vehicleId,
    });

    if (!vehicle) {
      return res
        .status(400)
        .json({ success: false, error: "Vehicle not found" });
    }

    const newVehicle = new Vehicle();
    newVehicle.vehicleType = vehicleType;
    newVehicle.tollRate = tollRate;

    vehiclesRepository.merge(vehicle, newVehicle);
    const result = await vehiclesRepository.save(vehicle);

    return res.status(200).json({
      success: true,
      message: "Vehicle info updated",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Error updating vehicle info!",
    });
  }
}

// @DELETE - baseUrl/vehicles/:vehicleId
export async function deleteVehicle(
  req: express.Request,
  res: express.Response
) {
  const vehicleId = req.params.vehicleId;

  try {
    const vehiclesRepository = datasource.getRepository(Vehicle);

    const vehicle = await vehiclesRepository.findOneBy({
      id: vehicleId,
    });

    if (!vehicle) {
      return res
        .status(400)
        .json({ success: false, error: "Vehicle not found" });
    }

    vehiclesRepository.delete(vehicle);

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Error finding vehicle!",
    });
  }
}
