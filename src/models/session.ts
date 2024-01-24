/** @format */

import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
    }
});

export default mongoose.model("session", BasicSchema);
