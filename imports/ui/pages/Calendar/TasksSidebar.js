import React, { useState } from "react"
import { taskCollection } from "../../../api/tasks"
import { eventCollection } from "../../../api/events"
import BounceLoader from "react-spinners/BounceLoader"
import Task from "./Task"
import Paper from "@mui/material/Paper"
import EventTaskBar from "../../EventTaskBar"

const TasksSidebar = props => {
  const today = new Date().toLocaleDateString()
  const task = taskCollection
    .find({
      dueDate: today,
    })
    .fetch()

  const evt = eventCollection.find({}).fetch()

  return (
    <>
      <div id="tasksbar" className="sidebar">
        <div className="todaystask">
        <a href="#" className="closebtn phoneOnly" onClick={() => closeNav()}>
          &times;
        </a>
        <h3>Today's Tasks</h3>
        {task.length !== 0 ? (
          <div>
            {React.Children.toArray(
              task.map((tsk, index) => (
                <Task
                  task={tsk.task}
                  completed={tsk.completed}
                  taskId={tsk._id}
                />
              ))
            )}
          </div>
        ) : (
          <div className="loader">
            <p>No tasks for today</p>
          </div>
        )}
        </div>
        <hr />
        <EventTaskBar />
      </div>
    </>
  )
}

function closeNav() {
  document.getElementById("tasksbar").style.width = "0"
  document.getElementById("container").style.display = "block"
  document.getElementById("hamburger").style.display = "block"
}

export default TasksSidebar
