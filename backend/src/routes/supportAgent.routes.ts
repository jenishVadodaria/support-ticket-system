import { Router } from "express";
import {
  createSupportAgent,
  getAllSupportAgents,
} from "../controllers/supportAgent.controller";

const router = Router();

router
  .route("/support-agents")
  .post(createSupportAgent)
  .get(getAllSupportAgents);

export default router;
