const mongoose = require("mongoose");

const { Schema } = mongoose;

// Basic Schema
const BasicSchema = new Schema({
  quorum_vote_id: {
    type: Schema.Types.ObjectId,
    ref: "quorum",
  },
  start_time: {
    type: Date,
    default: Date.now,
  },
  end_time: {
    type: Date,
    default: null,
  },
  vote_time: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("user_quorum", BasicSchema);
