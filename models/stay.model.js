import mongoose, { Schema } from "mongoose";

mongoose.set("runValidators", true);

const staySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    numberOfPersons: { type: Number },
    image: { type: String },
    price: { type: Number },
    includes: [{ type: String }],
  },
  { timestaps: true }
);

export default mongoose.models.stay || mongoose.model("stay", staySchema);
