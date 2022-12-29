import express = require("express");

import { datasource } from "../utils/datasource";
import { User } from "../entities";

// @GET - baseUrl/users
export async function getAllUsers(req: express.Request, res: express.Response) {
  try {
    const usersRepository = datasource.getRepository(User);
    const users = await usersRepository.find({
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        balance: true,
        vehicleType: true,
        vehicleId: true,
        tollRate: true,
      },
      relations: {
        transaction: true,
      },
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
  try {
    const usersRepository = datasource.getRepository(User);
    const userId = req.params.userId;
    const user = await usersRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
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
    const usersRepository = datasource.getRepository(User);
    const { name, address, phone, balance, vehicleType, vehicleId, tollRate } =
      req.body;

    const newUser = new User();
    newUser.name = name;
    newUser.address = address;
    newUser.phone = phone;
    newUser.balance = balance;
    newUser.vehicleType = vehicleType;
    newUser.vehicleId = vehicleId;
    newUser.tollRate = tollRate;

    await usersRepository.save(newUser);

    return res.status(200).json({
      success: true,
      message: "New user added",
      data: newUser,
    });
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
  try {
    const usersRepository = datasource.getRepository(User);
    const userId = req.params.userId;
    const user = await usersRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const { name, address, phone, balance, vehicleType, vehicleId, tollRate } =
      req.body;

    const newUser = new User();
    newUser.name = name;
    newUser.address = address;
    newUser.phone = phone;
    newUser.balance = balance;
    newUser.vehicleType = vehicleType;
    newUser.vehicleId = vehicleId;
    newUser.tollRate = tollRate;

    usersRepository.merge(user, newUser);
    const result = await usersRepository.save(user);

    return res.status(200).json({
      success: true,
      message: "User info updated",
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
  try {
    const usersRepository = datasource.getRepository(User);
    const userId = req.params.userId;
    const user = await usersRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
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

// @PATCH - baseUrl/users/balance/update
// @PATCH - baseUrl/users/:userId/balance/update
export async function updateUserBalance(
  req: express.Request,
  res: express.Response
) {
  try {
    const usersRepository = datasource.getRepository(User);

    const { vehicleId } = req.body;
    const user = await usersRepository.findOneBy({
      vehicleId: vehicleId,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Vehicle is not registered",
      });
    }

    const newUser = new User();
    newUser.balance = user.balance - user.tollRate;

    usersRepository.merge(user, newUser);
    const result = await usersRepository.save(user);

    return res.status(200).json({
      success: true,
      message: "Toll has been deducted from user balance",
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
