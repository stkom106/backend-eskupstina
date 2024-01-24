/** @format */

import mongoose from "mongoose";
const Schema = mongoose.Schema;



// Basic Schema
const BasicSchema = new Schema({
    quorum_vote_id: {
        type: Schema.Types.ObjectId,
        ref: 'quorum',
    },
    start_time: {
        type: Date,
        default: "",
    },
    end_time: {
        type: Date,
        default: "",
    },
    vote_time: {
        type: Date,
        default: "",
    },

});

export default mongoose.model("user_quorum", BasicSchema);
