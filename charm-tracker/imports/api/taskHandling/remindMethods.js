import React from "react"

// This prevents notifications from being suppressed if the reminder date is set behind the current date.
const preventDateBeforeToday = date => {
  const today = new Date()
  if (date.getTime() < today.getTime()) {
    return today.toLocaleString().split(",")
  }
  return date.toLocaleString().split(",")
}

// subtract offset of one day 86400000 in milliseconds
// this is due to date formatting conflicts.
const remind = {
  onFourteen: date => {
    let dueDate = Date.parse(date)
    dueDate = dueDate - (1209600000 - 86400000)
    let due = new Date(dueDate)
    due = preventDateBeforeToday(due)
    return due[0]
  },
  onThirty: date => {
    let dueDate = Date.parse(date)
    dueDate = dueDate - (2592000000 - 86400000)
    let due = new Date(dueDate)
    due = preventDateBeforeToday(due)
    return due[0]
  },
  onSixty: date => {
    let dueDate = Date.parse(date)
    dueDate = dueDate - (5184000000 - 86400000)
    let due = new Date(dueDate)
    due = preventDateBeforeToday(due)
    return due[0]
  },
  onFifteenth: () => {
    let dueDate = new Date()
    dueDate = dueDate.setDate(15)
    let due = new Date(dueDate)
    due = preventDateBeforeToday(due)
    return due[0]
  },
}

export default remind
