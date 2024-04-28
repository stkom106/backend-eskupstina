const AUTH = require("./auth");
const Agenda = require("./agenda");
const Vote = require("./vote");
const PDF = require("./pdf");
const multer = require("multer");
const Session = require("./session");
const upload = multer();
const API = (router) => {
  // APIs for Auth
  router.get("/test", (req, res) => {
    res.send("Hello World!");
  });
  router.post("/login", AUTH.login);
  router.get("/get_agenda", Agenda.get_agenda);
  router.post("/agenda", upload.single("pdf_path"), Agenda.createAgenda);
  router.get("/get_agenda_by_id", Vote.get_vote);
  router.post("/users", AUTH.get_users);
  router.get("/tv-users", AUTH.get_tv_users);
  router.get("/pdf", Agenda.show_pdf);
  router.get("/pdf-blob", PDF.get_pdf_blob);
  router.post("/vote", Agenda.do_vote);
  router.get("/get_vote", Vote.get_vote);
  router.get("/get_sessions", Session.get_all_sessions);
  router.post("/start_vote", Agenda.start_vote);
  router.post("/close_vote", Agenda.close_vote);
  router.post("/reset_vote", Agenda.reset_vote);
};

module.exports = API;
