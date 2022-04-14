import React, { useState } from "react"
import { taskCollection } from "../../../api/tasks"
import { eventCollection } from "../../../api/events"
import SyncLoader from "react-spinners/SyncLoader"
import Task from "./Task"
import Paper from "@mui/material/Paper"

const TasksSidebar = props => {
  const today = new Date().toLocaleDateString()
  const task = taskCollection
    .find({
      dueDate: today,
    })
    .fetch()

  return (
    <div>
      {task.length !== 0 ? (
        <Paper sx={{ width: 320, maxWidth: "50%" }}>
          {React.Children.toArray(
            task.map((tsk, index) => (
              <Task task={tsk.task} completed={tsk.completed} />
            ))
          )}
        </Paper>
      ) : (
        <SyncLoader color={"#36D7B7"} />
      )}
    </div>
  )
}

export default TasksSidebar
