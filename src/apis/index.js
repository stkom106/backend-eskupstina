const AUTH = require("./auth");
const Agenda = require("./agenda");
const Vote = require("./vote");

const API = (router) => {
  // APIs for Auth
  router.get("/test", (req, res) => {
    res.send("Hello World!");
  });
  router.post("/login", AUTH.login);
  router.get("/get_agenda", Agenda.get_agenda);
  router.get("/get_agenda_by_id", Vote.get_vote);
  router.post("/users", AUTH.get_users);
  router.get("/tv-users", AUTH.get_tv_users);
  router.get("/pdf", Agenda.show_pdf);
  router.post("/vote", Agenda.do_vote);
  router.get("/get_vote", Vote.get_vote);
  router.post("/start_vote", Agenda.start_vote);
  router.post("/close_vote", Agenda.close_vote);
  router.post("/reset_vote", Agenda.reset_vote);
};

module.exports = API;
