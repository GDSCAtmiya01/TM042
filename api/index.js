import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import universityRouter from "./routes/university.route.js"
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
const atmUniversity = mongoose.connection.client.db().collection('atm_universities');
const data2 = await atmUniversity.find().toArray();

if (data) {
  global.Events = data;
  // console.log(global.Events);
  global.Competitions = data1;
  global.university = data2;
}

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
}));

app.use(cookieParser());

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});

app.use("/api/auth", authRouter);
app.use("/api/university", universityRouter);
app.use("/api/event", eventRouter);
app.use("/api/competition", subeventRouter);
app.use("/api/user", userRouter);
