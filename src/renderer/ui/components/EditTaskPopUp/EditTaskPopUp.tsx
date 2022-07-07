
import { useForm } from "react-hook-form"
import styles from "./EditTaskPopUp.module.scss"
import { ipcRenderer } from "electron"



type Inputs = {
    taskName: string,
    taskDescription: string,
    updateStatus: boolean,
    taskToUpdate: string,
    setTaskToUpdate?: Function,
    setUpdateStatus: Function,
    taskList: any[];
};

export const EditTaskPopUp = (props: Inputs) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {
        const updatingTask: any = props.taskList.find(t => t._id == props.taskToUpdate)
        let updatedTask = {
            _id: updatingTask._id,
            taskName: data.taskName,
            taskDescription: data.taskDescription,
        }

        props.setUpdateStatus(false)
        ipcRenderer.send('update-task', updatedTask)
    };

    return (
        <div className={styles.EditTaskPopUp}>
            <button className={styles.closeButton} onClick={() => props.setUpdateStatus(false)}>x</button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Task name" required autoFocus  {...register("taskName")}></input>
                <textarea id="taskDescription" placeholder="Task Description" required {...register("taskDescription")}></textarea>
                <button type="submit">
                    Edit task
                </button>
            </form>
        </div>
    )

}
