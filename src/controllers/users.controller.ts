import express = require("express");
import { datasource } from "../utils/datasource";
import { User } from "../entities";

// @GET - baseUrl/users
export async function getAllUsers(req: express.Request, res: express.Response) {
  try {
    const usersRepository = datasource.getRepository(User);
    const users = await usersRepository.find({
      select: ["id", "name", "balance", "vehicleType", "tollRate"],
      relations: ["transaction"],
    });

    return res.status(200).json({
      success: true,
      message: "All users info found",
      data: users,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something want wrong!",
    });
  }
}

// @GET - baseUrl/users/:usersId
export async function getUser(req: express.Request, res: express.Response) {
  const userId = req.params.userId;

  try {
    const usersRepository = datasource.getRepository(User);
    const user = await usersRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User info found",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something want wrong!",
    });
  }
}

// @POST - baseUrl/users
export async function addUser(req: express.Request, res: express.Response) {
  try {
    const { vehicleType, tollRate } = req.body;
    const usersRepository = datasource.getRepository(User);
    // const previousEntry = await usersRepository.findOne(vehicleType);

    const newUser = new User();
    newUser.vehicleType = vehicleType;
    newUser.tollRate = tollRate;
    await usersRepository.save(newUser);

    return res
      .status(200)
      .json({ success: true, message: "New user added!", data: newUser });

    // if (!previousEntry) {
    //   const newVehicle = new Vehicle();

    //   newVehicle.vehicleType = vehicleType;
    //   newVehicle.tollRate = tollRate;

    //   await vehiclesRepository.save(newVehicle)
    // } else {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Vehicle already exists!" });
    // }
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something want wrong!",
    });
  }
}

// @PUT - baseUrl/users/:userId
export async function updateUser(req: express.Request, res: express.Response) {
  const userId = req.params.userId;

  try {
    const { vehicleType, tollRate } = req.body;
    const usersRepository = datasource.getRepository(User);
    const user = await usersRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const newUser = new User();
    newUser.vehicleType = vehicleType;
    newUser.tollRate = tollRate;
    usersRepository.merge(user, newUser);
    const result = await usersRepository.save(user);

    return res.status(200).json({
      success: true,
      message: "Vehicle info updated",
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something want wrong!",
    });
  }
}

// @DELETE - baseUrl/users/:userId
export async function deleteUser(req: express.Request, res: express.Response) {
  const userId = req.params.userId;

  try {
    const usersRepository = datasource.getRepository(User);
    const user = await usersRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    usersRepository.delete(user);

    return res.status(200).json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something want wrong!",
    });
  }
}
