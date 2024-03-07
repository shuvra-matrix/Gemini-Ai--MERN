import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatHistorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const chatHistory = mongoose.model("ChatHistory", chatHistorySchema);
