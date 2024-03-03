import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  ip: {
    type: String,
  },
  location: {
    type: String,
  },
  chatHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "ChatHistory",
    },
  ],
});

export const user = mongoose.model("User", userSchema);
