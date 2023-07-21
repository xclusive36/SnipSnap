
const { AuthenticationError } = require("apollo-server-express");
const { User, Stylist, Appointment, Service } = require("../models");
const { signToken } = require("../utils/auth");

// Define the resolvers, which contain the Query and Mutation objects.
const resolvers = {
  // Query object to define the available queries.
  Query: {
    // Resolver to fetch all users from the database.
    users: async () => {
      return User.find();
    },
    // Resolver to fetch a single user based on their username from the database.
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    // Resolver to fetch all stylists from the database.
    stylists: async () => {
      return Stylist.find();
    },
    // Resolver to fetch all services from the database.
    services: async () => {
      return Service.find();
    },
    // Resolver to fetch all appointments or appointments for a specific user from the database.
    appointments: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Appointment.find(params).sort({ createdAt: -1 });
    },
    // Resolver to fetch a single appointment based on its ID from the database.
    appointment: async (parent, { appointmentId }) => {
      return Appointment.findOne({ _id: appointmentId });
    },
    // Resolver to fetch all appointments for a specific user from the database.
    appointmentByUser: async (parent, { username }) => {
      return Appointment.find({ customerName: username });
    },
    // Resolver to fetch the currently logged-in user's details from the database.
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  // Mutation object to define the available mutations.
  Mutation: {
    // Resolver to add a new user to the database and sign a token for the user.
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // Resolver to perform user login and sign a token for the authenticated user.
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
    // Resolver to add a new stylist to the database.
    addStylist: async (parent, { stylistName }) => {
      return Stylist.create({ stylistName });
    },
    // Resolver to add a new service to the database.
    addService: async (parent, args) => {
      return Service.create(args);
    },
    // Resolver to add a new appointment for a specific user to the database.
    addAppointment: async (
      parent,
      {
        customerName,
        stylistName,
        appointmentDate,
        appointmentTime,
        appointmentType,
        appointmentCost,
      },
      context
    ) => {
      if (context.user) {
        const appointment = await Appointment.create({
          customerName,
          stylistName,
          appointmentDate,
          appointmentTime,
          appointmentType,
          appointmentCost,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { appointments: appointment._id } }
        );

        return appointment;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // Resolver to remove an appointment for a specific user from the database.
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

// Export the resolvers to make them available for use in the Apollo Server.
module.exports = resolvers;
