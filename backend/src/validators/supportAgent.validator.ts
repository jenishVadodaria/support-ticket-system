import Joi from "joi";
import { validator } from "../utils/validator";

const supportAgentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .length(10)
    .messages({
      "string.pattern.base": "Phone number should only have 10 digits.",
    })
    .required(),
  description: Joi.string().required(),
});

const getAllSupportAgentsSchema = Joi.object({
  page: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(0),
});

const validateSupportAgent = validator(supportAgentSchema);

const validateGetAllSupportAgents = validator(getAllSupportAgentsSchema);

export { validateSupportAgent, validateGetAllSupportAgents };
