import { Router } from "express";

import vehiclesRouter from "./vehicles.routes";
import usersRouter from "./users.routes";

const router = Router();

router.use("/vehicles", vehiclesRouter);
router.use("/users", usersRouter);

export default router;
