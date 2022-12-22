import { Router } from "express";

import usersRouter from "./users.routes";
import transactionsRouter from "./transactions.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/transactions", transactionsRouter);

export default router;
