const { VoteSchema } = require("../models");

const Vote = {
  create: async (props) => {
    const { user_id, agenda_item_id, decision } = props;

    try {
      const newData = new VoteSchema({
        user_id: user_id,
        agenda_item_id: agenda_item_id,
        decision: decision,
        vote_time: new Date(),
      });

      const saveData = await newData.save();

      if (!saveData) {
        throw new Error("Database Error");
      }

      return saveData;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  find: async (props) => {
    const { filter } = props;
    try {
      const result = await VoteSchema.find(filter);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  findOne: async (props) => {
    const { filter } = props;
    try {
      const result = await VoteSchema.findOne(filter);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

module.exports = Vote;
