import mongoose from "mongoose";

const Cart = new mongoose.model("Cart", {
  productID: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

export default mongoose.model("Cart", Cart);
