import { Router } from "express";
import { createSupportAgent } from "../controllers/supportAgent.controller";

const router = Router();

router.route("/support-agents").post(createSupportAgent);

export default router;
