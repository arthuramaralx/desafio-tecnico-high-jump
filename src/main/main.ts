import { app, BrowserWindow, ipcMain } from "electron";
import isDev from "electron-is-dev";
import path from "path";
import url from "url";
import Task from "../models/task";
require("../../database");

const productionUrl = path.resolve(__dirname, "../renderer/index.html");

const appUrl = isDev
  ? "http://localhost:3000"
  : url.format({
      pathname: productionUrl,
      protocol: "file:",
      slashes: true,
    });

async function run() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });
  await mainWindow.loadURL(appUrl);
  mainWindow.show();
}

ipcMain.on("new-task", async (e, args) => {
  const newTaskObj = {
    taskName: args.taskName,
    taskDescription: args.taskDescription,
  };

  const newTask = new Task(newTaskObj);
  const taskSaved = await newTask.save();
  e.reply("new-task-created", JSON.stringify(taskSaved));
});
ipcMain.on("get-tasks", async (e, args) => {
  const tasks = await Task.find();
  e.reply("get-tasks", JSON.stringify(tasks));
});
ipcMain.on("delete-task", async (e, args) => {
  const taskDeleted = await Task.findByIdAndDelete(args);
  e.reply("delete-task-sucess", JSON.stringify(taskDeleted));
});
ipcMain.on("update-task", async (e, args) => {
  const idToUpdate = args._id;
  const updatedTask = await Task.findByIdAndUpdate(idToUpdate, {
    taskName: args.taskName,
    taskDescription: args.taskDescription,
  });
  e.reply("update-task-sucess", JSON.stringify(args));
});
app.whenReady().then(run);
