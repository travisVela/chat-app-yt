import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectMongoDB from "./db/connectMongoDB.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

// config
dotenv.config();

// variables
const app = express();
const PORT = process.env.PORT;

// middle layer
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
// app.get("/", (req, res) => {
//   res.send("Hello World!!! hello again!");
// });

app.listen(PORT, () => {
  connectMongoDB();
  console.log("Server is running on port:", PORT);
});
