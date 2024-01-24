require("dotenv").config();

export = {
    mongoURI: "mongodb://localhost:27017/db_voting",
    secretOrKey: process.env.TOKEN_SECRET,
};
