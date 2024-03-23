const mongoose = require("mongoose");

const { Schema } = mongoose;

// Basic Schema
const BasicSchema = new Schema({
  session_id: {
    type: Schema.Types.ObjectId,
    ref: "session",
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

module.exports = mongoose.model("quorum", BasicSchema);
