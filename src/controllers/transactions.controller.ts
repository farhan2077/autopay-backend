import express = require("express");

import { datasource } from "../utils/datasource";
import { Transaction, User } from "../entities";

// @GET - baseUrl/transactions
export async function getAllTransactions(
  req: express.Request,
  res: express.Response
) {
  try {
    const transactionsRepository = datasource.getRepository(Transaction);
    const transactions = await transactionsRepository.find({
      select: ["createdAt", "paymentStatus"],
      relations: ["user"],
      order: {
        createdAt: "DESC",
      },
    });

    return res.status(200).json({
      success: true,
      message: "All transactions info found",
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Swomthing went wrong",
    });
  }
}

// @POST - baseUrl/transactions
export async function addTransaction(
  req: express.Request,
  res: express.Response
) {
  try {
    const usersRepository = datasource.getRepository(User);
    const transactionsRepository = datasource.getRepository(Transaction);
    const { vehicleId } = req.body;
    const user = await usersRepository.findOneBy({
      vehicleId: vehicleId,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User not found",
      });
    }

    if (user.balance < user.tollRate) {
      const newTransaction = new Transaction();
      newTransaction.user = user;
      newTransaction.paymentStatus = "declined";

      await transactionsRepository.save(newTransaction);

      return res.status(200).json({
        success: true,
        message: "Transaction is declined due to low balance",
      });
    }

    const newTransaction = new Transaction();
    newTransaction.user = user;
    newTransaction.paymentStatus = "paid";

    await transactionsRepository.save(newTransaction);

    return res.status(200).json({
      success: true,
      message: "New transaction added",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}
