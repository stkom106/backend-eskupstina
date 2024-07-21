const mongoose = require("mongoose");

const { Schema } = mongoose;

const sessionSchema = new Schema({
  name: {
    type: String,
    default: "",
  },
  start_time: {
    type: String,
    default: "",
  },
//   end_time: {
//     type: String,
//     default: "",
//   },
  status: {
    type: Boolean,
    default: false,
  },
  agendas: [{ type: Schema.Types.ObjectId, ref: "agenda" }], // Array of agenda references
});

module.exports = mongoose.model("session", sessionSchema);
