import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
