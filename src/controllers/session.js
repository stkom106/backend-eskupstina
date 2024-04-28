const { SessionSchema } = require("../models");

const Session = {
  findAll: async () => {
    try {
      const allSessions = await SessionSchema.find();
      return allSessions;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

module.exports = Session;
