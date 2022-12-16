import express = require("express");
import { datasource } from "../utils/datasource";
import { User } from "../entities";

// @GET - baseUrl/users
export async function getAllUsers(req: express.Request, res: express.Response) {
  try {
    const usersRepository = datasource.getRepository(User);

    const users = await usersRepository.find({
      select: ["id", "name", "address", "phone", "balance"],
      relations: ["vehicleType"],
    });

    return res.status(200).json({
      success: true,
      message: "All users info found",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Error fetching all users!",
    });
  }
}

// @POST - baseUrl/users
export async function addUser(req: express.Request, res: express.Response) {
  try {
    const { name, address, phone, balance, vehicleType } = req.body;

    const usersRepository = datasource.getRepository(User);

    const user = await usersRepository.findOneBy({
      name: name,
    });

    if (user) {
      return res.status(400).json({
        success: false,
        error: "User already exists!",
      });
    }

    const newUser = new User();
    newUser.name = name;
    newUser.address = address;
    newUser.phone = phone;
    newUser.balance = balance;
    if (vehicleType) {
      newUser.vehicleType = vehicleType;
    }

    await usersRepository.save(newUser);

    return res.status(200).json({
      success: true,
      message: "New user added.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "New user could not be added!",
    });
  }
}

// @DELETE - baseUrl/users/userId
export async function deleteUser(req: express.Request, res: express.Response) {
  const userId = req.params.userId;

  try {
    const usersRepository = datasource.getRepository(User);

    const user = await usersRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      return res.status(400).json({ success: false, error: "User not found" });
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
      error: "Something went wrong",
    });
  }
}
