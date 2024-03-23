const mongoose = require("mongoose");

const { Schema } = mongoose;

// Basic Schema
const BasicSchema = new Schema({
  session_id: {
    type: Schema.Types.ObjectId,
    ref: "session",
  },
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  pdf_path: {
    type: String,
    default: "",
  },
  vote_state: {
    type: Number,
    default: 0,
  },
  vote_info: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("agenda", BasicSchema);
