import { Router } from "express";
import {
  createSupportTicket,
  getAllSupportTickets,
} from "../controllers/supportTicket.controller";

const router = Router();

router
  .route("/support-tickets")
  .post(createSupportTicket)
  .get(getAllSupportTickets);

export default router;
