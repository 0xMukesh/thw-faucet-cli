import { Router } from "express";

import request from "./controllers/request";

const router = Router();

router.post("/request", request);

export default router;
