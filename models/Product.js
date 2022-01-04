import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    rating: {
      type: Array,
      default: {
        rate: 0,
        count: 0,
      },
    },
    description: { type: String, required: true },
    categories: { type: Array, required: true },
    quantity: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
