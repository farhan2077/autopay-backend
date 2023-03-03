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
      select: ["id", "createdAt", "paymentStatus"],
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
      error: "Something went wrong",
    });
  }
}

// @GET - baseUrl/transactions/:vehicleId
export async function getTransaction(
  req: express.Request,
  res: express.Response
) {
  try {
    const usersRepository = datasource.getRepository(User);
    const vehicleId = req.params.id;

    const user = await usersRepository.findOne({
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
      where: {
        vehicleId: vehicleId,
      },
      order: {
        transaction: {
          createdAt: "DESC",
        },
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Vehicle Id is not correct",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle info found",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
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
      return res.status(404).json({
        success: false,
        error: "Vehicle is not registered",
      });
    }

    if (user.balance < user.tollRate) {
      const newTransaction = new Transaction();
      newTransaction.user = user;
      newTransaction.paymentStatus = "declined";

      await transactionsRepository.save(newTransaction);

      return res.status(400).json({
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

// @DELETE - baseUrl/transactions/:transactionId
export async function deleteTransaction(
  req: express.Request,
  res: express.Response
) {
  try {
    const transactionsRepository = datasource.getRepository(Transaction);
    const transactionId = req.params.id;
    const transaction = await transactionsRepository.findOneBy({
      id: transactionId,
    });

    if (!transaction) {
      return res.status(400).json({
        success: false,
        message: "Transaction not found",
      });
    }

    transactionsRepository.delete(transaction);

    return res.status(200).json({
      success: true,
      message: "Transaction deleted",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something want wrong!",
    });
  }
}
