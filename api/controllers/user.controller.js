import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendMail.js";

export const createAdmin = async (req, res, next) => {
    const username = req.body.username;
    try {
        const user = await User.findOneAndUpdate({ username: username }, { isAdmin: true }, { new: true });
        if (!user) {
        res.status(400).json("Username does not exists!");
            return;
        }
        const token = jwt.sign({ id: user._id, isadmin: user.isAdmin }, process.env.JWT_SECRET);
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json("User is now an admin!");
    }catch (err) {
        next(err);
    };
}

export const sendMaill = async (req, res, next) => {
    const {from, to, subject, text} = req.body;
    try {
        const mailOptions = {
            from, // sender address
            to, // list of receivers email
            subject, 
            text
        };
        await sendEmail(mailOptions);
        res.status(200).json("Email sent successfully!");
    }catch (err) {
        next(err);
    };
}