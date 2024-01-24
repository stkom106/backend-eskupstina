import { Request, Response, NextFunction } from "express";
import controllers from "../controllers";
const fs = require('fs');

// get_agenda
const get_agenda = async (req: any, res: Response, next: NextFunction) => {
    try {
        // const { name, description, pdf }: any = req.body;
        // const agendas = controllers.Agenda.create({ name, description, pdf })
        const agendas = await controllers.Agenda.find("");
        res.status(200).json({ data: agendas });
    } catch (err: any) {
        console.log(err.message);
        res.status(401).end();
    }
};


// get_users
const show_pdf = async (req: any, res: Response, next: NextFunction) => {
    try {
        var data = fs.readFileSync('./public/agenda' + req.query.agenda + '.pdf');
        res.contentType("application/pdf");
        res.send(data);
    } catch (err: any) {
        console.log(err.message);
        res.status(401).end();
    }
};


// get_users
const start_vote = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { agenda_item_id } = req.body;
        const filter = { _id: agenda_item_id }
        const updateDoc = {
            $set: { "vote_state": 1 }
        }
        const options = {
            upsert: true
        }
        const data = await controllers.Agenda.update({ filter, updateDoc, options });
        res.status(200).json({ data: data });

    } catch (err: any) {
        console.log(err.message);
        res.status(401).end();
    }
};


// get_users
const close_vote = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { agenda_item_id } = req.body;
        const filter = { _id: agenda_item_id }
        const updateDoc = {
            $set: { "vote_state": 2 }
        }
        const options = {
            upsert: true
        }
        const data = await controllers.Agenda.update({ filter, updateDoc, options });
        res.status(200).json({ data: data });

    } catch (err: any) {
        console.log(err.message);
        res.status(401).end();
    }
};


// get_users
const do_vote = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { user_id, agenda_id, decision } = req.body;
        // const { agenda_item_id } = req.body;

        let agenda = await controllers.Agenda.findOne({ filter: { $eq: agenda_id } });
        if (agenda?.vote_state == 2) {
            res.status(401).end();
            return;
        }
        const filter = { _id: agenda_id }
        let tmp: any = [];
        console.log("🚀 ~ file: agenda.ts:84 ~ constdo_vote= ~ agenda!.vote_info:", agenda!.vote_info)
        if (agenda!.vote_info == "null")
            tmp.push({ user_id: user_id, decision: decision })
        else {
            tmp = JSON.parse(agenda!.vote_info);
            tmp.push({ user_id: user_id, decision: decision })
        }
        const updateDoc = {
            $set: { "vote_info": JSON.stringify(tmp) }
        }
        const options = {
            upsert: true
        }
        const data = await controllers.Agenda.update({ filter, updateDoc, options });

        res.status(200).json({ data: data });

    } catch (err: any) {
        console.log(err.message);
        res.status(401).end();
    }
};

// get_users
const reset_vote = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { agenda_id } = req.body;
        // const { agenda_item_id } = req.body;
        const filter = { _id: agenda_id }

        const updateDoc = {
            $set: {
                "vote_info": "null",
                "vote_state": 0
            }
        }
        const options = {
            upsert: true
        }
        const data = await controllers.Agenda.update({ filter, updateDoc, options });
        res.status(200).json({ data: data });

    } catch (err: any) {
        console.log(err.message);
        res.status(401).end();
    }
};


export default {
    get_agenda,
    show_pdf,
    start_vote,
    close_vote,
    do_vote,
    reset_vote
}