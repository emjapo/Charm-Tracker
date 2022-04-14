import React, { useState, useEffect } from "react"
import { CalendarHeader } from "../../CalendarHeader"
import { Day } from "../../Day"
import DeleteEventModal from "../../DeleteEventModal/DeleteEventModal"
import { useDate } from "../../hooks/useDate"
import NavBar from "../../NavBar"
import TasksSidebar from "./TasksSidebar"
import { eventCollection } from "../../../api/events"
import { taskCollection } from "../../../api/tasks"

const formatDateTo = (date, type) => {
  if (type === "yyyy-mm-dd") {
    let splitDate = date.split("/")

    let mLen = splitDate[0].length
    if (mLen < 2) {
      splitDate[0] = "0" + splitDate[0]
    }

    let dLen = splitDate[1].length
    if (dLen < 2) {
      splitDate[1] = "0" + splitDate[1]
    }

    let ymdDate = [splitDate[2], splitDate[0], splitDate[1]]
    return ymdDate.join("-")
  }

  if (type === "mm/dd/yyyy") {
    let dateArray = date.split("-")

    let mInitChar = dateArray[1].charAt(0)
    if (mInitChar === "0") {
      dateArray[1] = dateArray[1].replaceAll("0", "")
    }

    let dInitChar = dateArray[2].charAt(0)
    if (dInitChar === "0") {
      dateArray[2] = dateArray[2].replaceAll("0", "")
    }

    let mdyDate = [dateArray[1], dateArray[2], dateArray[0]]
    return mdyDate.join("/")
  }
  return ""
}

const eventsToday = today => {
  let specificDate = formatDateTo(today, "yyyy-mm-dd")
  const evt = eventCollection.find({ date: specificDate }).fetch()
  return evt
}

const eventDays = event => {
  let days = []
  for (const e of event) {
    let fDate = formatDateTo(e.date, "mm/dd/yyyy")
    days.push(fDate)
  }

  return days
}

const Calendar = () => {
  const [nav, setNav] = useState(0)
  const [clicked, setClicked] = useState()
  const [events, setEvents] = useState(
    eventCollection.find({}).fetch() !== 0
      ? eventCollection.find({}).fetch()
      : []
  )

  const eventForDate = date =>
    events.find(e => e.date === formatDateTo(date, "yyyy-mm-dd"))

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events))
  }, [events])

  const { days, dateDisplay } = useDate(events, nav)

  const evt = eventCollection.find({}).fetch()
  if (evt !== 0) {
    console.log("The events: ", evt)
  }
  const daysWithEvents = evt.length != 0 ? eventDays(evt) : []

  let evtsToday = []

  return (
    <>
      <div id="calendar_page">
        <NavBar />
        <TasksSidebar />
        <div id="container">
          <img
            className="openbtn phoneOnly"
            src="/images/taskicon.png"
            onClick={() => openNav()}
          />
          <CalendarHeader
            dateDisplay={dateDisplay}
            onNext={() => setNav(nav + 1)}
            onBack={() => setNav(nav - 1)}
          />

          <div id="weekdays">
            <div>Sunday</div>
            <div>Monday</div>
            <div>Tuesday</div>
            <div>Wednesday</div>
            <div>Thursday</div>
            <div>Friday</div>
            <div>Saturday</div>
          </div>

          <div id="calendar">
            {days.map(
              (d, index) => (
                (evtsToday = daysWithEvents.includes(d.date)
                  ? eventsToday(d.date)
                  : []),
                (
                  <Day
                    key={index}
                    day={d}
                    onClick={() => {
                      if (d.value !== "padding") {
                        setClicked(d.date)
                      }
                    }}
                    evtsToday={evtsToday}
                  />
                )
              )
            )}
          </div>
        </div>
      </div>
      {clicked && eventForDate(clicked) && (
        <DeleteEventModal
          eventText={eventForDate(clicked).eventName}
          onDelete={() => {
            let ftdDate = formatDateTo(clicked, "yyyy-mm-dd")
            setEvents(events.filter(e => e.date !== ftdDate))
            const eventId = eventForDate(clicked)._id
            eventCollection.remove({ _id: eventId })
            taskCollection.remove({ eventID: eventId })
            console.log("Deleting stuff")
          }}
          onClose={() => setClicked(null)}
        />
      )}
    </>
  )
}

function openNav() {
  document.getElementById("tasksbar").style.width = "100vw"
  document.getElementById("container").style.display = "none"
  document.getElementById("hamburger").style.display = "none"
}

export default Calendar
