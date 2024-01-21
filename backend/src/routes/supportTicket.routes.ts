import { Router } from "express";
import {
  createSupportTicket,
  getAllSupportTickets,
  updateSupportTicket,
} from "../controllers/supportTicket.controller";

const router = Router();

router
  .route("/support-tickets")
  .post(createSupportTicket)
  .get(getAllSupportTickets)
  .patch(updateSupportTicket);

export default router;
