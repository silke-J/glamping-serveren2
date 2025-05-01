import mongoose, { Schema } from "mongoose";

mongoose.set("runValidators", true);

const activitySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    weekday: { type: String },
    image: { type: String },
    time: { type: String },
  },
  { timestaps: true }
);

export default mongoose.models.activity ||
  mongoose.model("activity", activitySchema);
