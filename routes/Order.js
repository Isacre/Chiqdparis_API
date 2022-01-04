import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const product = await Order.find();
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json("something went wrong");
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const NewOrder = new Order(req.body);
  try {
    const saveProduct = await NewOrder.save();
    res.status(201).json(saveProduct);
  } catch (err) {
    res.status(400).json("No duplicates allowed");
    console.log(err);
  }
});

export default router;
