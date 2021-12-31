import mongoose from "mongoose";

const Cart = new mongoose.model("Cart", {
  product: {
    title: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    id: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    rating: [
      {
        rate: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
      },
    ],
    description: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
  },
  quantity: { type: Number, default: 1 },
});

export default mongoose.model("Cart", Cart);
