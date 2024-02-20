import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const checkusername = await User.findOne({ username: username });
  if (checkusername != null) {
    return next(errorHandler(401, "username already exists!"));
  }
  const checkemail = await User.findOne({ email: email });
  if (checkemail != null) {
    return next(errorHandler(401, "email already exists!"));
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(200).json("created new user successfully!");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validUser = await User.findOne({ username: username });
    if (!validUser) return next(errorHandler(404, "user not found!"));

    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) return next(errorHandler(401, "wrong credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};
