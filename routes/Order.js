import express from "express";
import Order from "../models/User.js";
import { verifyTokenAndAdmin, verifyTokenAndAuth } from "./verifyToken.js";

const router = express.Router();

//CREATE ORDER
router.post("/", verifyTokenAndAuth, async (req, res) => {
  try {
    const newOrder = await new Order({
      ownerid: req.body.ownerid,
      products: [
        {
          productid: req.body.productid,
          price: req.body.price,
          quantity: req.body.quantity,
        },
      ],
      cpf: req.body.cpf,
      adress: req.body.adress,
      total: req.body.total,
    });
    const save = newOrder.save();
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});
//UPDATE
router.put("/:orderid", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Cart.findByIdAndUpdate(
      req.params.orderid,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:orderid", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.orderid);
    res.status(200).json("Order Has been deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});

//GET ORDERS
router.get("/:orderid", verifyTokenAndAuth, async (req, res) => {
  try {
    const order = await Order.find({ orderid: req.params.orderid });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
});
//GET ALL ORDERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//MONTH INCOME
router.get("/dashboard", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total",
        },

        $group: {
          _id: "$month",
          tota: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
