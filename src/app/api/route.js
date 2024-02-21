import { Task } from "./models/Task";
import mongoose from "mongoose";

// Connect to MongoDB when the application starts
mongoose.connect(process.env.MOGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

export async function GET() {
  try {
    const taskList = await Task.find()
    return Response.json(taskList)
  } catch (error) {
    return Response.json(error)
  }
}

export async function POST(req) {
  try {
    const newTask = await req.json()
    const createdTask = await Task.create(newTask)
    return Response.json(createdTask)
  } catch (error) {
    return Response.json(error)
  }
}

export async function PUT(req) {
  try {
    const { title } = await req.json()
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')

    const editedTask = await Task.updateOne({ _id }, { title })
    return Response.json(editedTask)
  } catch (error) {
    return Response.json(error)
  }
}

export async function DELETE(req) {
  const url = new URL(req.url)
  const _id = url.searchParams.get('_id')

  await Task.deleteOne({ _id })

  return Response.json(true)
}