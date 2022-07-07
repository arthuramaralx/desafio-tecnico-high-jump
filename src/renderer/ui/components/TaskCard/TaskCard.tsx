import React from "react"
import styles from "./TaskCard.module.scss"
import { ipcRenderer } from "electron"

type Inputs = {
    taskName: string,
    taskDescription: string,
    id: string,
    updateStatus?: boolean,
    taskToUpdate?: string,
    setTaskToUpdate: Function,
    setUpdateStatus: Function
};

export const TaskCard: React.FC<Inputs> = (props) => {

    function deleteTask(id: string) {
        const result = confirm('Would you like to delete the task?')
        result ?
            ipcRenderer.send('delete-task', id) : null
    }
    function editTask(id: string) {
        props.setUpdateStatus(true)
        let idTaskUpdate = props.id
        props.setTaskToUpdate(idTaskUpdate)

    }

    return (
        <div className={styles.TaskCard}>
            <div>
                <p>
                    {props.taskName}
                </p>
            </div>
            <div>
                <p>
                    {props.taskDescription}
                </p>
            </div>
            <div>

                <button onClick={() => editTask(props.id)}>Edit</button>
                <button onClick={() => deleteTask(props.id)}>Delete</button>
            </div>
        </div>
    )

}
