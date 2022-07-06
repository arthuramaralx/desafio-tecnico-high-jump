import React, { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import styles from "./AppBody.module.scss"
import { ipcRenderer } from "electron"
import { TaskCard } from "../TaskCard/TaskCard"


type Inputs = {
    taskName: string,
    taskDescription: string
};


interface TaskListProps extends Inputs {
    _id: string;
};

export const AppBody: React.FC = () => {


    const [taskList, setTaskList] = useState<TaskListProps[]>([])


    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs>  = data => {
        ipcRenderer.send('new-task', data)
    };


    useEffect(() => {


      
        ipcRenderer.send('get-tasks');

        ipcRenderer.on('get-tasks', async (e, args) => {
            const tasklist = await JSON.parse(args)
            setTaskList(tasklist)
   
        });
   
    }, [])


    useEffect(() => {


     
        ipcRenderer.on('new-task-created', async (e, args) => {
            const newTask = await JSON.parse(args);
          
            setTaskList([...taskList, newTask])
            
        })
   
    }, [taskList])


        ipcRenderer.on('delete-task-sucess',async (e,args) => {
            const deletedTask = JSON.parse(args);
            const newTaskList =  taskList.filter(item =>{
                return item._id !== deletedTask._id
            })
            setTaskList(newTaskList)
        })






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

                    <>
                        {taskList.map((task, i) => {
                          
                             return  <TaskCard taskDescription={task.taskDescription} key={i} taskName={task.taskName} id={task._id}></TaskCard>
                            
                        })
                        }
                    </>

                </ul>
            </div>
        </div>
    )

}
