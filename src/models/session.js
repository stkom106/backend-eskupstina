const mongoose = require("mongoose");

const { Schema } = mongoose;

// Basic Schema
const BasicSchema = new Schema({
  start_time: {
    type: String,
    default: "",
  },
  end_time: {
    type: String,
    default: "",
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("session", BasicSchema);
