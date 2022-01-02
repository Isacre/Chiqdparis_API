import mongoose from "mongoose";

const Order = new mongoose.model(
  "Order",
  {
    products: [
      {
        product: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    cpf: { type: String, required: true },
    adress: { type: String, required: true },
    id: { type: Number, required: true, unique: true },
    status: { type: String, default: "pendente" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", Order);
