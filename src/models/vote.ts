/** @format */

import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface VoteType {
    child?: mongoose.Types.ObjectId,
    name?: string
}

// Basic Schema
const BasicSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        unique: true,
    },
    agenda_item_id: {
        type: Number,
        default: 0
    },
    decision: {
        type: String,
        default: "",
    },
    vote_time: {
        type: Date,
        default: "",
    },

});

export default mongoose.model("vote", BasicSchema);
