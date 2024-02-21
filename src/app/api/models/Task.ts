import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  title: String,
}, { timestamps: true })

export const Task = models.Task || model('Task', TaskSchema)