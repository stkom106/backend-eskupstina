import AUTH from "./auth";
import Agenda from "./agenda"
import Vote from "./vote"

const API = (router: any) => {
    // APIs for Auth
    router.get('/test', (req: any, res: any) => {
        res.send("Hello World!");
    });
    router.post("/login", AUTH.login);
    router.get("/get_agenda", Agenda.get_agenda);
    router.post("/users", AUTH.get_users);
    router.get("/pdf", Agenda.show_pdf);
    router.post("/vote", Agenda.do_vote);
    router.get("/get_vote", Vote.get_vote);
    router.post("/start_vote", Agenda.start_vote);
    router.post("/close_vote", Agenda.close_vote);
    router.post("/reset_vote", Agenda.reset_vote);
};

export default API;
