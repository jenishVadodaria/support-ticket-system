import { Request, Response } from "express";
import { SupportAgent } from "../models/supportAgent.model";
import {
  validateGetAllSupportAgents,
  validateSupportAgent,
} from "../validators/supportAgent.validator";
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

    const { name, email, phone, description } = value;

    const existingAgent = await SupportAgent.findOne({ email });

    if (existingAgent) {
      throw new ApiError(409, "", ["Agent already exists"]);
    }

    const newAgent = await SupportAgent.create({
      name,
      email,
      phone,
      description,
      active: true,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, newAgent, "Agent created successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const getAllSupportAgents = async (req: Request, res: Response) => {
  try {
    const { error, value } = validateGetAllSupportAgents(req.query);

    if (error) {
      return res.status(400).json(
        new ApiError(
          400,
          "Validation error",
          error.details.map((data) => data.message)
        )
      );
    }

    const { page, limit } = value;

    const options: { page: number; limit: number } = {
      page: parseInt(page) || 0,
      limit: parseInt(limit) || 10,
    };

    const skip: number = options.page * options.limit;

    const agents = await SupportAgent.find({})
      .select("name email phone description active dateCreated")
      .skip(skip)
      .limit(options.limit);

    const totalCount = await SupportAgent.countDocuments();

    const responseData = {
      totalCount,
      agents,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, responseData, "Agents fetched successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export { createSupportAgent, getAllSupportAgents };
