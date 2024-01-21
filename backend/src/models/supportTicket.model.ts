// /backend/src/models/comment.model.js
import mongoose, { Schema } from "mongoose";

const supportTicketSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    dateCreated: {
      type: Date,
      default: Date.now,
    },

    severity: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
    },

    type: {
      type: String,
      required: true,
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "SupportAgent",
    },

    status: {
      type: String,
      default: "New",
      enum: ["New", "Assigned", "Resolved"],
    },

    resolvedOn: { type: Date },

    agentName: { type: String },
  },
  { timestamps: true }
);

export const SupportTicket = mongoose.model(
  "SupportTicket",
  supportTicketSchema
);
