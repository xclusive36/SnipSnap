const { AuthenticationError } = require("apollo-server-express");
const { User, Stylist, Appointment, Service } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    stylists: async () => {
      return Stylist.find();
    },
    services: async () => {
      return Service.find();
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
    addService: async (parent, args) => {
      return Service.create(args);
    },
    addAppointment: async (
      parent,
      { customerName, stylistName, appointmentDate, appointmentTime },
      context
    ) => {
      if (context.user) {
        const appointment = await Appointment.create({
          customerName,
          stylistName,
          appointmentDate,
          appointmentTime,
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
