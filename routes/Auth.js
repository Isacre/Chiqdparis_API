import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const router = express.Router();

router.post("/register", async (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_PASSWORD
    ).toString(),
    cpf: req.body.cpf,
    isAdmin: false,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json("something went wrong");
    console.log(err);
  }
});
("");
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Please inform a login");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_PASSWORD
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.statusCode(400).json("Wrong password");

    const acessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWTPASS,
      {
        expiresIn: "3d",
      }
    );

    const { cpf, password, __v, ...others } = user._doc;

    res.status(200).json({ ...others, acessToken });
  } catch (err) {
    res.status(400).json("Something went wrong");
    console.log(err);
  }
});

export default router;
