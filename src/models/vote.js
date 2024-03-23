const mongoose = require("mongoose");

const { Schema } = mongoose;

// Basic Schema
const BasicSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    unique: true,
  },
  agenda_item_id: {
    type: Number,
    default: 0,
  },
  decision: {
    type: String,
    default: "",
  },
  vote_time: {
    type: Date,
    default: null, // Use null instead of an empty string for default Date value
  },
});

module.exports = mongoose.model("vote", BasicSchema);
