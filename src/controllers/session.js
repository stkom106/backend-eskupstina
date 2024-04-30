const { SessionSchema, AgendaSchema } = require("../models");

const Session = {
  findAll: async () => {
    try {
      const allSessions = await SessionSchema.find();
      return allSessions;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  removeAgenda: async (props) => {
    try {
      let agendaDeleted = false;
      const sessions = await SessionSchema.find();

      await Promise.all(
        sessions.map(async (session) => {
          const index = session.agendas.indexOf(props);
          if (index !== -1) {
            session.agendas.splice(index, 1);
            await session.save();
            agendaDeleted = true;
          }
        })
      );

      return agendaDeleted;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  delete: async (props) => {
    try {
      const session = await SessionSchema.find({ _id: props });

      const agendas = session[0].agendas;
      const filter = { _id: { $in: agendas } };
      const res = await AgendaSchema.deleteMany(filter);
      const result = await SessionSchema.deleteOne({ _id: props });
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

module.exports = Session;
