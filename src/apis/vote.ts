import { Request, Response, NextFunction } from "express";
import controllers from "../controllers";
import { VoteSchema } from "../models";

// get_users
const do_vote = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { user_id, agenda_id, decision } = req.body;
        const vote = await controllers.Vote.create({ user_id: user_id, agenda_item_id: agenda_id, decision: decision })
        res.status(200).json({ vote: vote });
    } catch (err: any) {
        console.log(err.message);
        res.status(401).end();
    }
};

const get_vote = async (req: any, res: Response, next: NextFunction) => {
    try {
        // const users = await controllers.Auth.findOne("");
        // const vote = await controllers.Vote.find("");
        const voteData = await VoteSchema.find().populate('user_id').exec()
        // console.log("🚀 ~ file: vote.ts:22 ~ constget_vote= ~ res:", voteData)
        res.status(200).json({ vote: voteData });
    } catch (err: any) {
        console.log(err.message);
        res.status(401).end();
    }
};



export default {
    do_vote, get_vote
}