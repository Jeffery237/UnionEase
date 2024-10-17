import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import { connectDB  } from "./connectDB.js";
import authRoutes from "./routes/auth.route.js";
import requestRoutes from "./routes/request.route.js";
import appointmentRoutes from "./routes/appointment.route.js";
import timeslotRoutes from "./routes/timeslot.route.js";
import userRoutes from "./routes/user.route.js"
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4003;

app.use(express.json()); //allows us to parse incoming requests: req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //allows us to parse incoming cookies
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true // Allow cookies and other credentials to be sent
  }));
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/timeslots", timeslotRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`App running on port: ${PORT}`)
})

export {app};