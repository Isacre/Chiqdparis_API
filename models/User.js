import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    favourites: { type: Array, default: [], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
