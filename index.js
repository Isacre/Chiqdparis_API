import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/Auth.js";
import ProductsRoute from "./routes/Product";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => {
    console.log("DB Connection Sucessfull!");
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server is Running");
});

app.get("/", (req, res) => res.send("<h1>hello mundo</h1>"));

app.use(express.json());
app.use("/", authRoute);
app.use("/", ProductsRoute);
