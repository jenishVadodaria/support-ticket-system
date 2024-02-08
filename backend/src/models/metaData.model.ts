import mongoose, { Schema } from "mongoose";

const metaDataSchema = new Schema({
  lastAssignedIndex: {
    type: Number,
    required: true,
    default: -1,
  },
});

export const MetaData = mongoose.model("MetaData", metaDataSchema);

// MetaData.create({ lastAssignedIndex: -1 });
