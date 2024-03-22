require("dotenv").config();

import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { LoginObject } from "../interfaces/global";
import controllers from "../controllers";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginObject = req.body;
    // const user = await controllers.Auth.create({ email, password })
    // console.log("🚀 ~ file: auth.ts:17 ~ login ~ user:", user)
    // console.log("🚀 ~ file: auth.ts:16 ~ login ~ email:", email)

    if (!(email.trim() && password.trim())) {
      return res.status(400).send("Please Enter All Required Data.");
    }

    const user: any = await controllers.Auth.findOne({
      filter: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      // User check
      return res.status(404).send("User Not Exist. Please Register");
    }
    // const pass = await bcrypt.compare(password, user.password);

    console.log(
      "🚀 ~ file: auth.ts:37 ~ login ~ user.password:",
      user.password
    );
    if (password == user.password) {
      // // Password check
      const token = jwt.sign(
        { user_id: user._id, email: email.toLowerCase().trim() },
        String("abc"),
        {
          expiresIn: "2h",
        }
      ); // Create token

      res
        .status(200)
        .json({
          success: true,
          id: user._id,
          role: user.role,
          token: token,
          name: user.name,
        });
    } else {
      return res.status(400).send("Password or Username Is Not Correct");
    }
  } catch (err: any) {
    console.log("login error: ", err);
    res.status(500).send(err.message);
  }
};

// Middleware
const middleware = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = <string>req.headers["authorization"] || "";
    console.log(token);

    jwt.verify(
      token,
      String(process.env.TOKEN_KEY),
      async (err: any, userData: any) => {
        if (err) return res.status(403).end();

        const user: any = await controllers.Auth.findOne({
          filter: {
            email: userData.email,
          },
        });
        req.user = user; // Save user data

        next();
      }
    );
  } catch (err: any) {
    console.log(err.message);
    res.status(401).end();
  }
};

// get_users
const get_users = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id }: any = req.body;
    const users = await controllers.Auth.fintByCity(id);
    res.status(200).json({ data: users });
  } catch (err: any) {
    console.log(err.message);
    res.status(401).end();
  }
};

export default {
  login,
  middleware,
  get_users,
};
