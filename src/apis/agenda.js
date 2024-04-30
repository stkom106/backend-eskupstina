const controllers = require("../controllers");
const fs = require("fs");
const azure = require("azure-storage");
// create agenda
const blobService = azure.createBlobService(
  process.env.AZURE_STORAGE_ACCOUNT_STORAGE_STRING
);

const createAgenda = async (req, res) => {
  try {
    // Retrieve other form data
    const { title, description, agenda_type, session } = req.body;

    // Handle file
    const { buffer, originalname } = req.file;

    // Upload file to Azure Blob Storage
    const blobName = originalname; // Use original file name as blob name
    await new Promise((resolve, reject) => {
      blobService.createBlockBlobFromText(
        "mainpdf",
        blobName,
        buffer,
        (error, result, response) => {
          if (error) {
            console.error("Error uploading file to Azure Blob Storage:", error);
            return reject(error);
          }
          resolve(result);
        }
      );
    });

    // Create agenda in database
    const pdf_path = blobName; // Use blob name as PDF path
    const agenda = await controllers.Agenda.create({
      name: title,
      description: description,
      pdf: pdf_path,
      agenda_type: agenda_type,
      session_id: session,
    });

    res.status(200).json({ data: agenda });
  } catch (error) {
    console.error("Error processing file upload:", error);
    res.status(500).json({ error: "Error processing file upload" });
  }
};

// get_agenda
const get_agenda = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (id) {
      const agenda = await controllers.Agenda.findOne({ filter: id });
      console;
      res.status(200).json({ data: agenda });
    }
    const agendas = await controllers.Agenda.find("");
    res.status(200).json({ data: agendas });
  } catch (err) {
    console.log(err.message);
    res.status(401).end();
  }
};

// show_pdf
const show_pdf = async (req, res, next) => {
  try {
    const agendaId = req.query.agenda;
    if (!agendaId) {
      res.status(400).json({ error: "agenda parameter is missing" });
      return;
    }
    const filePath = `./public/${agendaId}`;
    const data = fs.readFileSync(filePath);
    res.contentType("application/pdf");
    res.send(data);
  } catch (err) {
    console.log(err.message);
    res.status(401).end();
  }
};

// start_vote
const start_vote = async (req, res, next) => {
  try {
    const { agenda_item_id } = req.body;
    if (!agenda_item_id) {
      res.status(400).json({ error: "agenda_item_id parameter is missing" });
      return;
    }
    const filter = { _id: agenda_item_id };
    const updateDoc = {
      $set: { vote_state: 1 },
    };
    const options = {
      upsert: true,
    };
    const data = await controllers.Agenda.update({
      filter,
      updateDoc,
      options,
    });
    res.status(200).json({ data: data });
  } catch (err) {
    console.log(err.message);
    res.status(401).end();
  }
};

// close_vote
const close_vote = async (req, res, next) => {
  try {
    const { agenda_item_id } = req.body;
    if (!agenda_item_id) {
      res.status(400).json({ error: "agenda_item_id parameter is missing" });
      return;
    }
    const filter = { _id: agenda_item_id };
    const updateDoc = {
      $set: { vote_state: 2 },
    };
    const options = {
      upsert: true,
    };
    const data = await controllers.Agenda.update({
      filter,
      updateDoc,
      options,
    });
    res.status(200).json({ data: data });
  } catch (err) {
    console.log(err.message);
    res.status(401).end();
  }
};

// do_vote
const do_vote = async (req, res, next) => {
  try {
    const { user_id, agenda_id, decision } = req.body;
    if (!user_id || !agenda_id) {
      res.status(400).json({
        error: "user_id, agenda_id, or decision parameter is missings.",
      });
      return;
    }
    let agenda = await controllers.Agenda.findOne({
      filter: { $eq: agenda_id },
    });
    if (!agenda || agenda.vote_state == 2) {
      res.status(401).end();
      return;
    }
    const filter = { _id: agenda_id };
    let tmp = [];
    if (agenda.vote_info == "null")
      tmp.push({ user_id: user_id, decision: decision });
    else {
      tmp = JSON.parse(agenda.vote_info);
      tmp.push({ user_id: user_id, decision: decision });
    }
    const updateDoc = {
      $set: { vote_info: JSON.stringify(tmp) },
    };
    const options = {
      upsert: true,
    };
    const data = await controllers.Agenda.update({
      filter,
      updateDoc,
      options,
    });
    res.status(200).json({ data: data });
  } catch (err) {
    console.log(err.message);
    res.status(401).end();
  }
};

// reset_vote
const reset_vote = async (req, res, next) => {
  try {
    const { agenda_id } = req.body;
    if (!agenda_id) {
      res.status(400).json({ error: "agenda_id parameter is missing" });
      return;
    }
    const filter = { _id: agenda_id };
    const updateDoc = {
      $set: {
        vote_info: null,
        vote_state: 0,
      },
    };
    const options = {
      upsert: true,
    };
    const data = await controllers.Agenda.update({
      filter,
      updateDoc,
      options,
    });
    res.status(200).json({ data: data });
  } catch (err) {
    console.log(err.message);
    res.status(401).end();
  }
};
const delete_agenda = async (req, res, next) => {
  try {
    const agenda_item_id = req.params.id;
    if (!agenda_item_id) {
      res.status(400).json({ error: "agenda_item_id parameter is missing" });
      return;
    }
    const filter = { _id: agenda_item_id };
    const result = await controllers.Agenda.delete({ filter });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Agenda item not found" });
      return;
    }

    const removedFromSession = controllers.Session.removeAgenda(agenda_item_id);

    if (!removedFromSession) {
      res.status(404).json({ error: "Agenda item not deleted from session" });
      return;
    }
    res
      .status(200)
      .json({ status: 1, message: "Agenda item deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createAgenda,
  get_agenda,
  show_pdf,
  start_vote,
  close_vote,
  do_vote,
  reset_vote,
  delete_agenda, // Add the delete_agenda function to module exports
};
