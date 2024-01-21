import Joi from "joi";
import { validator } from "../utils/validator";

const createSupportTicketSchema = Joi.object({
  topic: Joi.string().required(),
  description: Joi.string().required(),
  severity: Joi.string().valid("Low", "Medium", "High").required(),
  type: Joi.string().required(),
  resolvedOn: Joi.date(),
});

const updateSupportTicketSchema = Joi.object({
  id: Joi.string().required(),
  topic: Joi.string(),
  description: Joi.string(),
  severity: Joi.string().valid("Low", "Medium", "High"),
  type: Joi.string(),
  resolvedOn: Joi.date(),
});

const getAllSupportTicketSchema = Joi.object({
  status: Joi.string(),
  agentName: Joi.string(),
  severity: Joi.string(),
  type: Joi.string(),
  sortBy: Joi.string().valid("resolvedOn", "dateCreated"),
  sortOrder: Joi.string().valid("asc", "desc"),
  page: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(0),
});

const validateSupportTicket = validator(createSupportTicketSchema);

const validateUpdateSupportTicket = validator(updateSupportTicketSchema);

const validateGetAllSupportTickets = validator(getAllSupportTicketSchema);

export {
  validateSupportTicket,
  validateUpdateSupportTicket,
  validateGetAllSupportTickets,
};
