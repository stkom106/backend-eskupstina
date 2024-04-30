const { AgendaSchema, SessionSchema } = require("../models");

const Agenda = {
  create: async (props) => {
    const { name, description, pdf, agenda_type, session_id } = props;
    try {
      const newData = new AgendaSchema({
        name: name,
        description: description,
        pdf_path: pdf,
        agenda_type: agenda_type,
        session_id: session_id,
      });

      const saveData = await newData.save();

      if (!saveData) {
        throw new Error("Database Error");
      }

      const sessionToUpdate = await SessionSchema.findOne({ _id: session_id });

      if (!sessionToUpdate) {
        throw new Error("Session not found");
      }

      sessionToUpdate.agendas.push(saveData._id);

      await sessionToUpdate.save();

      return saveData;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  findOne: async (props) => {
    const { filter } = props;
    try {
      const result = await AgendaSchema.findById(filter);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  find: async (props) => {
    const { filter } = props;
    try {
      const result = await AgendaSchema.find(filter);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  update: async ({ filter, updateDoc, options }) => {
    try {
      const result = await AgendaSchema.updateOne(filter, updateDoc, options);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  findAll: async () => {
    try {
      const allSessions = await AgendaSchema.find();
      return allSessions;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  delete: async (props) => {
    const { filter } = props;
    try {
      const result = await AgendaSchema.deleteOne(filter);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

module.exports = Agenda;
