const { SessionSchema, AgendaSchema } = require("../models");

const Session = {
  create: async (props) => {
    const { name, start_time, end_time } = props;
    try {
      const newData = new SessionSchema({
        name: name,
        start_time: start_time,
        end_time: end_time,
        agendas: [],
      });

      const saveData = await newData.save();

      if (!saveData) {
        throw new Error("Database Error");
      }

      return saveData;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  update: async (props) => {
    const { name, start_time, end_time, id } = props;


    try {
      const session = await SessionSchema.findOne({ _id: id });

      if (!session) {
        throw new Error("Session not found");
      }

      session.name = name || session.name;
      session.start_time = start_time || session.start_time;
      session.end_time = end_time || session.end_time;

      const updatedSession = await session.save();
      return updatedSession;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  findAll: async (year) => {
    try {
      const allSessions = (await SessionSchema.find().sort({_id:-1}));

      if (year) {
        const filteredSessions = allSessions.filter((session) => {
          const sessionYear = new Date(session?.start_time).getFullYear().toString();
          return sessionYear === year;
        });
        return filteredSessions;
      }
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
