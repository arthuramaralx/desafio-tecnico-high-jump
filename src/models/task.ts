import { ObjectId } from "mongodb";
import mongoose, { Schema, model, connect } from "mongoose";


export interface ITask {
    taskName: string,
    taskDescription: string
}

const userSchema = new Schema<ITask>({
    taskName: { type: String, required: true },
    taskDescription: { type: String, required: true }
});


const Task = mongoose.model<ITask>('Task', userSchema);
export default Task;

//   const Task = model<ITask>('Task', userSchema);

//   run().catch(err => console.log(err));

//   async function run() {
//     // 4. Connect to MongoDB
//     await connect('mongodb://localhost:27017/electronchallenge');

//     const task = new Task({
//      taskName: "test task",
//      taskDescription: "description task"
//     });
//     await task.save();
//     console.log(task.taskName);
//     }
    