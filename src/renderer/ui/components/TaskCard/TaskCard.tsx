import React, { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import styles from "./TaskCard.module.scss"
import { ipcRenderer } from "electron"
import Task from "../../../../models/task"


type Inputs = {
    taskName: string,
    taskDescription: string,
    id: string
};

export const TaskCard: React.FC<Inputs> = (props) => {



    async function deleteTask(id: string) {
        const result =  confirm('Would you like to delete the task?')
        result ?
            ipcRenderer.send('delete-task', id) : null
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

                <button>Edit</button>
                <button onClick={() => deleteTask(props.id)}>Delete</button>
                </div>
        </div>
    )

}
