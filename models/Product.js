import mongoose from "mongoose";

const Product = new mongoose.model(
  "Product",
  {
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
  { timestamps: true }
);

module.exports = mongoose.model("Product", Product);
