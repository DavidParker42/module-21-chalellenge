const { Tech, Matchup, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const{ signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return User.findOne({_id: context.user._id});
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
       const user = await User.create(args);

       if (!user) {
         throw new AuthenticationError("No User Added");
       }
       const token = signToken(user);
       return {token, user}
    },
    login: async (parent, { email, password }) => {
     const user = await User.findOne({
       $or: [{ email: email }],
     });
     if (!user) {
       throw new AuthenticationError("No User Found");
     }

     const correctPw = await user.isCorrectPassword(body.password);

     if (!correctPw) {
       throw new AuthenticationError("Invalid Credentials");
     }
     const token = signToken(user);
     return { token, user };
    },
    saveBooks: async (parent, args, context) => {
       try {
         const updatedUser = await User.findOneAndUpdate(
           { _id: context.user._id },
           { $addToSet: { savedBooks: args.bookData } },
           { new: true, runValidators: true }
         );
         return (updatedUser);
       } catch (err) {
         console.log(err);
         throw new AuthenticationError("Book not Found");
       }
    },
    deleteBooks: async (parent, args, context) => {
        const updatedUser = await User.findOneAndUpdate(
      { _id: context.user._id },
      { $pull: { savedBooks: args.bookId } },
      { new: true }
    );
    if (!updatedUser) {
      throw new AuthenticationError("Issue with Deletion");
    }
    return (updatedUser);
  },
}}

module.exports = resolvers;
