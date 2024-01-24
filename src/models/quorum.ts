/** @format */

import mongoose from "mongoose";
const Schema = mongoose.Schema;



// Basic Schema
const BasicSchema = new Schema({
    session_id: {
        type: Schema.Types.ObjectId,
        ref: "session",
    },
    start_time: {
        type: Date,
        default: "",
    },
    end_time: {
        type: String,
        default: "",
    },
    vote_time: {
        type: Date,
        default: "",
    },

});

export default mongoose.model("quorum", BasicSchema);
