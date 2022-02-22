import React from "react"
import Header from "../Header"
import EventDetailsForm from "../EventDetailsForm"

const EditEvent = () => {
    return (
        <div>
            <Header title="Edit Event" />
            <EventDetailsForm />
            <div>
                <button>Cancel</button>
                <button onClick={() => console.log("this doesn't do anything yet")}>Add Event</button>
            </div>
        </div>
    )
}

export default EditEvent