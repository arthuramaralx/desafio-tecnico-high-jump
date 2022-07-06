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
