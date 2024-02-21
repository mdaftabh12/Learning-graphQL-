import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: "string",
    required: true,
  },
  lastName: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  firstName: {
    type: "string",
    required: true,
  },
  firstName: {
    type: "string",
    required: true,
  },
});

mongoose.model("userModel", userSchema);
