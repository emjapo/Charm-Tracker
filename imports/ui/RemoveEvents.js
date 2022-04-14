import React from "react";
import { eventCollection } from "../api/events";
import Header from "./Header";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
//need to create/import user collection

// will need to recieve the event id as a prop
const RemoveEvents = (props) => {
  const { eventID } = props
  
  
  const handleSubmit = (event) => {
    event.preventDefault();

    let userPassword = "Danita"; // FIXME:  this will need to check that the password is the same as the looged in user
    //popup to confirm password
    const { value: password } = Swal.fire({
      title: "Enter pin to confirm removal",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
        return new Promise((resolve) => {
          if (value == userPassword) {
            // let removedEvent = event.target.removeEvent.value;
            if (eventID) {
              // event.target.removeEvent.value = "";
              eventCollection.remove({ _id: eventID });
              console.log("Event removed");
            }
            resolve();
          } else {
            resolve("Password was not correct");
          }
        });
      },
    });
  };


  return (
    <div className="removeEventsButton">
        <form onSubmit={handleSubmit}>
            <button>Remove event</button>
        </form>
    </div>
  );
};

export default RemoveEvents;
