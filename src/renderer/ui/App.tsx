import React, { useEffect, useState } from "react"
import { getDate } from "../../common/getDate"
import { AppBody } from "./components/AppBody/AppBody"
import styles from "./App.module.scss"
import ipcRenderer from "electron"

export const App: React.FC = () => {

  


  const [date, setDate] = useState(getDate())

  useEffect(() => {
    setTimeout(() => setDate(getDate()), 1000)
  }, [date, setDate])

  return (
    <div className={styles.app}>
      <h2 className={styles.h2}>Task Manager</h2>
      <div>
      <AppBody></AppBody>
        
      </div>
    </div>
  )
}
