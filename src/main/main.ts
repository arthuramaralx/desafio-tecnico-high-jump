import { app, BrowserWindow, ipcMain } from "electron"
import isDev from "electron-is-dev"
import path from "path"
import url from "url"

import Task from "../models/task"

require("../../database")

const productionUrl = path.resolve(__dirname, "../renderer/index.html")

const appUrl = isDev
  ? "http://localhost:3000"
  : url.format({
    pathname: productionUrl,
    protocol: "file:",
    slashes: true
  })

async function run() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  })
  await mainWindow.loadURL(appUrl)
  mainWindow.show()
  mainWindow.webContents.openDevTools()
}

ipcMain.on('new-task', async (e, args)=> {
  const newTaskObj = {
    taskName: args.taskName,
    taskDescription: args.taskDescription
  }

    const newTask = new Task(newTaskObj);
    const taskSaved = await newTask.save();
    e.reply('new-task-created', JSON.stringify(taskSaved));

})
ipcMain.on('get-tasks', async (e, args)=> {
  const tasks = await Task.find();
  e.reply('get-tasks', JSON.stringify(tasks))
})
app.whenReady().then(run)