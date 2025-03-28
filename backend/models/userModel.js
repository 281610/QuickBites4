/*import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default:"user" },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

const userModel = mongoose.model.user || mongoose.model("user", userSchema);
export default userModel;
*/




























import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["buyer", "cook"], default: "buyer" },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { timestamps: true } // Add timestamps for `createdAt` and `updatedAt`
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
