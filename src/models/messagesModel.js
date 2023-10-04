const { Schema, model } = require("mongoose"); 
const chatSchema = new Schema(
  {
    email: String,
    message: String,
  },
  { timestamps: true }
);

module.exports = model("messages", chatSchema);
