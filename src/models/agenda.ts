/** @format */

import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
        default: 0
    },
    vote_info: {
        type: String,
        default: ""
    }

});

export default mongoose.model("agenda", BasicSchema);
