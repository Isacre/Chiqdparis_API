import express from "express";
import Product from "../models/Product.js";
import { v4 as uuid_v4 } from "uuid";

const id = uuid_v4();

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Product;
    res.status(201).json(products);
  } catch (err) {
    res.status(400).json("something went wrong");
    console.log(err);
  }
});
("");
router.post("/new/product", async (req, res) => {
  const newProduct = new Product({
    title: req.body.title,
    price: req.body.price,
    id: id,
    image: req.body.image,
    description: req.body.description,
    category: req.body.category,
  });
  try {
    const saveProduct = await newProduct.save();
    res.status(201).json(saveProduct);
  } catch (err) {
    res.status(400).json("something went wrong");
    console.log(err);
  }
});

export default router;
