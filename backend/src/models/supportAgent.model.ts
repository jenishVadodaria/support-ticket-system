import mongoose, { Schema } from "mongoose";

const supportAgentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
      required: true,
    },

    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const SupportAgent = mongoose.model("SupportAgent", supportAgentSchema);
