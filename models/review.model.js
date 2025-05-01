import mongoose, { Schema } from "mongoose";

mongoose.set("runValidators", true);

const reviewSchema = new Schema(
  {
    review: { type: String, required: true },
    age: { type: Number },
    name: { type: String },
    image: { type: String },
    stay: { type: String },
  },
  { timestaps: true }
);

export default mongoose.models.review || mongoose.model("review", reviewSchema);
