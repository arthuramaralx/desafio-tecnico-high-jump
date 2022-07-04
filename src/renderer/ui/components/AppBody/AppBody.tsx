import React, { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import styles from "./AppBody.module.scss"
import { ipcRenderer } from "electron"



export const AppBody: React.FC = () => {

 

    type Inputs = {
        taskName: string,
        taskDescription: string
    };
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        ipcRenderer.send('new-task', data)
    };
    ipcRenderer.on('new-task-created', async (e, args) => {
        const newTask = JSON.parse(args);
    })
    ipcRenderer.send('get-tasks');



    ipcRenderer.on('get-tasks', async (e, args) => {
        const tasklist = JSON.parse(args)
        console.log(tasklist)
    
        
    });


    return (
        <div className={styles.AppBody}>
            <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
                <input type="text" id="taskName" placeholder="Task name" required autoFocus {...register("taskName")}></input>
                <textarea id="" placeholder="Task Description" required {...register("taskDescription")}></textarea>
                <button type="submit">
                    Save
                </button>
            </form>
            <>

            </>
            <div>
                <ul id="taskList">

                </ul>
            </div>
        </div>
    )

}
