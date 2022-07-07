import React, { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import styles from "./AppBody.module.scss"
import { ipcRenderer } from "electron"
import { TaskCard } from "../TaskCard/TaskCard"
import { EditTaskPopUp } from "../EditTaskPopUp/EditTaskPopUp"

type Inputs = {
    taskName: string,
    taskDescription: string
};

interface TaskListProps extends Inputs {
    _id: string;
};

export const AppBody: React.FC = () => {


    const [taskList, setTaskList] = useState<TaskListProps[]>([])
    const [updateStatus, setUpdateStatus] = useState(false)
    const [taskToUpdate, setTaskToUpdate] = useState("")
    const [taskNameValue, setTaskNameValue] = useState("")
    const [taskDescriptionValue, setTaskDescriptionValue] = useState("")

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {

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

        ipcRenderer.on('delete-task-sucess', async (e, args) => {
            const deletedTask = JSON.parse(args);
            const newTaskList = taskList.filter(item => {
                return item._id !== deletedTask._id
            })
            setTaskList(newTaskList)
        })
        ipcRenderer.on('update-task-sucess', (e, args) => {
            const updatedTask = JSON.parse(args)
            let updatedTaskList = taskList
            updatedTaskList.map(task => {
                if (task._id === updatedTask._id) {

                    task.taskName = updatedTask.taskName;
                    task.taskDescription = updatedTask.taskDescription;
                    return task
                }
            })
            setTaskList(updatedTaskList)
        })

    }, [taskList])



    return (
        <div className={styles.AppBody}>
            <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Task name" required  {...register("taskName")}></input>
                <textarea id="taskDescription" placeholder="Task Description" required {...register("taskDescription")}></textarea>
                <button type="submit">
                    Save
                </button>
            </form>
            <>

                <>
                    {updateStatus && <EditTaskPopUp taskList={taskList} setUpdateStatus={setUpdateStatus} updateStatus={updateStatus} taskName={taskNameValue} taskDescription={taskDescriptionValue} taskToUpdate={taskToUpdate} ></EditTaskPopUp>}
                </>

            </>
            <div>
                <ul id="taskList">

                    <>
                        {taskList.map((task, i) => {

                            return <TaskCard updateStatus={updateStatus} taskToUpdate={taskToUpdate}
                                setTaskToUpdate={setTaskToUpdate} setUpdateStatus={setUpdateStatus}
                                taskDescription={task.taskDescription} key={i} taskName={task.taskName} id={task._id}></TaskCard>

                        })
                        }
                    </>

                </ul>
            </div>
        </div>
    )

}
