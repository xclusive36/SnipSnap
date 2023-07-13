const { AuthenticationError } = require("apollo-server-express");
const { User, Stylist, Appointment } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
      // .populate("appointments");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
      // .populate("appointments");
    },
    stylists: async () => {
      return Stylist.find();
    },
    appointments: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Appointment.find(params).sort({ createdAt: -1 });
    },
    appointment: async (parent, { appointmentId }) => {
      return Appointment.findOne({ _id: appointmentId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
        // .populate("appointments");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addStylist: async (parent, { stylistName }) => {
      return Stylist.create({ stylistName });
    },
    addAppointment: async (parent, { appointmentInfo }, context) => {
      if (context.user) {
        const appointment = await Appointment.create({
          appointmentInfo,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { appointments: appointment._id } }
        );

        return appointment;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeAppointment: async (parent, { appointmentId }, context) => {
      if (context.user) {
        const appointment = await Appointment.findOneAndDelete({
          _id: appointmentId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { appointments: appointment._id } }
        );

        return appointment;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
