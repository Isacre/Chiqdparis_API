import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    cpf: { type: String, required: true, unique: true },
    shoppingCart: { type: Array, default: [] },
    purchases: { type: Array, default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
