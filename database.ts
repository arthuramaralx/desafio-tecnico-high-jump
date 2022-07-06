import mongoose, { Schema, model, connect } from "mongoose";
import { ObjectId } from "mongodb";
require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/electronchallenge", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));




//  interface ITask {
//     taskName: string,
//     taskDescription: string
// }

// const userSchema = new Schema<ITask>({
//     taskName: { type: String, required: true },
//     taskDescription: { type: String, required: true }
//   });

//   const Task = model<ITask>('Task', userSchema);

//   run().catch(err => console.log(err));

//   async function run() {
//     // 4. Connect to MongoDB
//     await connect('mongodb://localhost:27017/test');

//     const task = new Task({
//      taskName: "test task",
//      taskDescription: "description task"
//     });
//     await task.save();

//     console.log(task.taskName);
//   }
