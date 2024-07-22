const { AgendaSchema, SessionSchema } = require("../models");
const controllers = require("../controllers");

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

  update: async (props) => {
    const { name, description, agenda_type, session_id, id, pdf } = props;
    try {
      const agenda = await AgendaSchema.findOne({ _id: id });
      if (!agenda) {
        throw new Error("Agenda not found");
      }

      agenda.name = name || agenda.name;
      agenda.description = description || agenda.description;
      agenda.agenda_type = agenda_type || agenda.agenda_type;
      agenda.pdf_path = pdf || agenda.pdf_path;

      if (agenda.session_id.toString() != session_id.toString()) {
        if (session_id == "undefined") {
          agenda.session_id = agenda.session_id;
        } else {
          const oldSession = await SessionSchema.findOne({
            _id: agenda.session_id,
          });

          oldSession.agendas = oldSession.agendas.filter((item) => {
            return item.toString() != agenda._id.toString();
          });

          oldSession.save();

          const newSession = await SessionSchema.findOne({
            _id: session_id,
          });
          newSession.agendas.push(agenda._id);

          newSession.save();
          agenda.session_id = session_id;
        }
      }

      const updatedAgenda = await agenda.save();

      return updatedAgenda;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  
  updateVote: async ({ filter, updateDoc, options }) => {
    try {
      const result = await AgendaSchema.updateOne(filter, updateDoc, options);
      return result;
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
