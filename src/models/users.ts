/** @format */

import mongoose from "mongoose";
import { createFalse } from "typescript";
const Schema = mongoose.Schema;

// Basic Schema
const BasicSchema = new Schema({
    email: {
        type: String,
        default: "",
        require: true,
        unique: true
    },
    name: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    party_id: {
        type: Schema.Types.ObjectId,
        ref: "party",
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300,
    },
    updatedAt: {
        type: Date,
        default: "",
    }
});

export default mongoose.model("users", BasicSchema);
