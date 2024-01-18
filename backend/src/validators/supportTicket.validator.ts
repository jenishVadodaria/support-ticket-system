import Joi from "joi";
import { validator } from "../utils/validator";

const supportTicketSchema = Joi.object({
  topic: Joi.string().required(),
  description: Joi.string().required(),
  severity: Joi.string().valid("Low", "Medium", "High").required(),
  type: Joi.string().required(),
});

const getAllSupportTicketSchema = Joi.object({
  status: Joi.string().valid("New", "Assigned", "Resolved"),
  assignedTo: Joi.string(),
  severity: Joi.string().valid("Low", "Medium", "High"),
  type: Joi.string(),
  sortBy: Joi.string().valid("resolvedOn", "dateCreated"),
  sortOrder: Joi.string().valid("asc", "desc"),
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1),
});

const validateSupportTicket = validator(supportTicketSchema);

const validateGetAllSupportTickets = validator(getAllSupportTicketSchema);

export { validateSupportTicket, validateGetAllSupportTickets };
