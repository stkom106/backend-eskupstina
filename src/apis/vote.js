const { Request, Response, NextFunction } = require("express");
const controllers = require("../controllers");
const { VoteSchema } = require("../models");

// do_vote
const do_vote = async (req, res, next) => {
  try {
    const { user_id, agenda_id, decision } = req.body;
    const vote = await controllers.Vote.create({
      user_id: user_id,
      agenda_item_id: agenda_id,
      decision: decision,
    });
    res.status(200).json({ vote: vote });
  } catch (err) {
    console.log(err.message);
    res.status(401).end();
  }
};

// get_vote
const get_vote = async (req, res, next) => {
  try {
    const voteData = await VoteSchema.find().populate("user_id").exec();
    res.status(200).json({ vote: voteData });
  } catch (err) {
    console.log(err.message);
    res.status(401).end();
  }
};

module.exports = {
  do_vote,
  get_vote,
};
