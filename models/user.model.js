import mongoose, { mongo, Schema } from "mongoose";

mongoose.set("runValidators", true);

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  image: { type: String },
  hashedPassword: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
});

export default mongoose.models.user || mongoose.model("user", userSchema);
