const controllers = require("../controllers");

// get_all_sessions
const get_all_sessions = async (req, res) => {
  try {
    const sessions = await controllers.Session.findAll();
    const agendas = await controllers.Agenda.findAll();

    // New array to store organized data
    const organizedData = [];

    // Loop through sessions
    sessions.forEach((session) => {
      const sessionAgendas = agendas.filter((agenda) =>
        session.agendas.includes(agenda._id)
      );

      organizedData.push({
        id: session._id,
        name: session.name,
        agendas: sessionAgendas,
      });
    });

    res.status(200).json({ data: organizedData });
  } catch (error) {
    console.error("Error getting all sessions:", error);
    res.status(500).json({ error: "Error getting all sessions" });
  }
};

module.exports = {
  get_all_sessions,
};
