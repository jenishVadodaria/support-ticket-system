import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { SupportAgent } from "../models/supportAgent.model";
import {
  validateGetAllSupportTickets,
  validateSupportTicket,
} from "../validators/supportTicket.validator";
import { SupportTicket } from "../models/supportTicket.model";
import { MetaData } from "../models/metaData.model";
import { SortOrder } from "mongoose";

const createSupportTicket = async (req: Request, res: Response) => {
  try {
    const { error, value } = validateSupportTicket(req.body);

    if (error) {
      return res.status(400).json(
        new ApiError(
          400,
          "Validation error",
          error.details.map((data) => data.message)
        )
      );
    }

    const { topic, description, severity, type } = value;

    const supportAgents = await SupportAgent.find({ active: true });
    if (supportAgents.length === 0) {
      throw new ApiError(400, "No active support agents available");
    }

    const metaData = await MetaData.findOneAndUpdate(
      {},
      { $inc: { lastAssignedIndex: 1 } },
      { new: true }
    );

    if (!metaData) {
      throw new ApiError(400, "Something went wrong, Please try again.");
    }

    const lastAssignedIndex = metaData.lastAssignedIndex % supportAgents.length;

    const assignedAgent = supportAgents[lastAssignedIndex];

    const newTicket = await SupportTicket.create({
      topic,
      description,
      severity,
      type,
      assignedTo: assignedAgent._id,
      status: "New",
    });

    return res
      .status(201)
      .json(new ApiResponse(201, newTicket, "Ticket created successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const getAllSupportTickets = async (req: Request, res: Response) => {
  try {
    if (!req.query) {
      const tickets = await SupportTicket.find({});
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            tickets,
            tickets.length === 0
              ? "No tickets found"
              : "Tickets fetched successfully"
          )
        );
    }

    const { error, value } = validateGetAllSupportTickets(req.query);

    if (error) {
      return res.status(400).json(
        new ApiError(
          400,
          "Validation error",
          error.details.map((data) => data.message)
        )
      );
    }

    const {
      status,
      assignedTo,
      severity,
      type,
      sortBy,
      sortOrder,
      page,
      limit,
    } = value;

    const filter: { [key: string]: string } = {};
    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (severity) filter.severity = severity;
    if (type) filter.type = type;

    const sort: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const options: { page: number; limit: number } = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    };

    const skip: number = (options.page - 1) * options.limit;

    const tickets = await SupportTicket.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(options.limit);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          tickets,
          tickets.length === 0
            ? "No tickets found"
            : "Tickets fetched successfully"
        )
      );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export { createSupportTicket, getAllSupportTickets };
