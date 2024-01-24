require("dotenv").config();

export = {
    mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/ChatApp",
    secretOrKey: process.env.TOKEN_SECRET,
};
