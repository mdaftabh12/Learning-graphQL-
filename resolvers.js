import { users, quotes } from "./fackdb.js";
import { randomBytes } from "crypto";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const User = mongoose.model("userModel");
const Quote = mongoose.model("quoteModel");

const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { _id }) => await User.findById(_id),
    quotes: async () => await Quote.find({}).populate("by", "_id firstName"),
    iquotes: async (_, { by }) => await Quote.find({ by: by }),
  },
  User: {
    quotes: async (user) => {
      await Quote.find({ by: user._id });
    },
  },
  Mutation: {
    signupUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exists in the database");
      }
      const hashedPassword = await bcrypt.hash(userNew.password, 10);

      const newUser = new User({
        ...userNew,
        password: hashedPassword,
      });

      return await newUser.save();
    },

    signinUser: async (_, { userSignIn }) => {
      const user = await User.findOne({ email: userSignIn.email });
      if (!user) {
        throw new Error("User does not exist");
      }
      const doMatch = await bcrypt.compare(userSignIn.password, user.password);
      if (!doMatch) {
        throw new Error("email or password do not match");
      }
      let token = jwt.sign({ userId: user._id }, "AFTABHU12");
      return { token };
    },

    createQuote: async (_, { name }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      console.log(userId);
      const newQuote = new Quote({ name, by: userId });
      await newQuote.save();
      return "Quote saved successfully";
    },
  },
};

export default resolvers;
