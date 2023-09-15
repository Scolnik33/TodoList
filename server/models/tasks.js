import mongoose, { Mongoose } from "mongoose";

const TasksSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true
    },
    task: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tasks", TasksSchema);
