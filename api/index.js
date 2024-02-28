import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import eventRouter from "./routes/event.route.js";
import subeventRouter from "./routes/sub_event.route.js"
import userRouter from "./routes/user.route.js";
dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to server");
  })
  .catch((err) => {
    console.log(err);
  });

const atmEvents = mongoose.connection.client.db().collection('atm_events');
const data = await atmEvents.find().toArray();
const atmCompetition = mongoose.connection.client.db().collection('atm_competitions');
const data1 = await atmCompetition.find().toArray();

if (data) {
  global.Events = data;
  global.Competitions = data1;
}

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});

app.use("/api/auth", authRouter);
app.use("/api/event", eventRouter);
app.use("/api/competition", subeventRouter);
app.use("/api/user", userRouter);
