import { Request, Response } from "express";
import { SupportAgent } from "../models/supportAgent.model";
import { validateSupportAgent } from "../validators/supportAgent.validator";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const createSupportAgent = async (req: Request, res: Response) => {
  try {
    const { error, value } = validateSupportAgent(req.body);

    if (error) {
      return res.status(400).json(
        new ApiError(
          400,
          "Validation error",
          error.details.map((data) => data.message)
        )
      );
    }

    const { name, email, phone, description, active } = value;

    const existingAgent = await SupportAgent.findOne({ email });

    if (existingAgent) {
      throw new ApiError(409, "Agent already exists");
    }

    const newAgent = await SupportAgent.create({
      name,
      email,
      phone,
      description,
      active,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, newAgent, "Agent created successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export { createSupportAgent };
