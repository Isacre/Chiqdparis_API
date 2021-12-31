import mongoose from "mongoose";

const Cart = new mongoose.model("Cart", {
  userID: { type: Number, required: true },
  products: [
    {
      productId: { type: Number },
      quantity: { type: Number, default: 1 },
    },
  ],
});

export default mongoose.model("Cart", Cart);
