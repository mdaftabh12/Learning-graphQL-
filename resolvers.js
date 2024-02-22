import { users, quotes } from "./fackdb.js";
import { randomBytes } from "crypto";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const User = mongoose.model("userModel");
const Quote = mongoose.model("quoteModel");

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { _id }) => users.find((user) => user._id === _id),
    quotes: () => quotes,
    iquotes: (_, { by }) => quotes.filter((quote) => quote.by === by),
  },
  User: {
    quotes: (user) => quotes.filter((quote) => quote.by == user._id),
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
      const newQuote = new Quote({ name, userId });
      await newQuote.save();
      return "Quote saved successfully";
    },
  },
};

export default resolvers;
