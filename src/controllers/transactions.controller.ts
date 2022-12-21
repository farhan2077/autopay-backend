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
      error: "Error fetching all transactions!",
    });
  }
}

// @POST - baseUrl/transactions
export async function addTransaction(
  req: express.Request,
  res: express.Response
) {
  try {
    const { userId } = req.body;

    const usersRepository = datasource.getRepository(User);
    const transactionsRepository = datasource.getRepository(Transaction);

    const user = await usersRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User not found",
      });
    }

    const newTransaction = new Transaction();
    newTransaction.user = userId;
    // newTransaction.paidAmount = user.vehicle.tollRate;
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
      error: "Something went wrong!",
    });
  }
}

// @DELETE - baseUrl/transactions
export async function deleteTransaction(
  req: express.Request,
  res: express.Response
) {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
}
