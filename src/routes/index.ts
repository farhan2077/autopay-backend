import { Router } from "express";

import vehiclesRouter from "./vehicles.routes";

const router = Router();

router.use("/vehicles", vehiclesRouter);

export default router;
