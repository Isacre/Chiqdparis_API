import express from "express";
import Cart from "../models/User.js";
import { verifyTokenAndAdmin, verifyTokenAndAuth } from "./verifyToken.js";

const router = express.Router();

//CREATE CART
router.post("/", verifyTokenAndAuth, async (req, res) => {
  try {
    const newCart = await new Cart({
      cartowner: req.body.cartowner,
      items: [],
    });
    const save = newCart.save();
    res.status(200).json(newCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
//UPDATE
router.put("/:userid", verifyTokenAndAuth, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body.items,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:userid", verifyTokenAndAuth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("User Has been deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});

//GET CART
router.get("/:userid", verifyTokenAndAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userid: req.params.userid });
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json(err);
  }
});
//GET ALL CARTS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
