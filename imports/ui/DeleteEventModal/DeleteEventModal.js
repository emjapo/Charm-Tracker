import React from "react"

const DeleteEventModal = props => {
  const { eventText, onClose, onDelete } = props

  return (
    <>
      <div id="deleteEventModal">
        <h2>Event</h2>

        <p id="eventText">{eventText}</p>

        <button onClick={onDelete} id="deleteButton">
          Delete
        </button>
        <button onClick={onClose} id="closeButton">
          Cancel
        </button>
      </div>

      <div id="modalBackDrop"></div>
    </>
  )
}

export default DeleteEventModal
