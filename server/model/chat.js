import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  chatHistory: {
    type: Schema.Types.ObjectId,
    ref: "ChatHistory",
  },
  chat: [
    {
      type: Object,
      required: true,
    },
  ],
});

export const chat = mongoose.model("Chat", chatSchema);
