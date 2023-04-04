import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Please provide your company name"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide job position"],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending", "employed"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship", "hybrid"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "My City",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
