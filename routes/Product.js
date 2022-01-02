import express from "express";
import Product from "../models/Product.js";
import { v4 as uuid_v4 } from "uuid";

const id = uuid_v4();

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json("something went wrong");
    console.log(err);
  }
});

router.post("/new/product", async (req, res) => {
  const product = await Product.find();
  const newProduct = new Product({
    title: req.body.title,
    price: req.body.price,
    id: product.length,
    image: req.body.image,
    description: req.body.description,
    category: req.body.category,
    rating: [
      {
        rate: 0,
        count: 0,
      },
    ],
  });
  try {
    const saveProduct = await newProduct.save();
    res.status(201).json(saveProduct);
  } catch (err) {
    res.status(400).json("No duplicates allowed");
    console.log(err);
  }
});

export default router;
