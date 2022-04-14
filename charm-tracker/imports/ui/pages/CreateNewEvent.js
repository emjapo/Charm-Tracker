import React, { useState } from "react"
import { Link } from "react-router-dom"
import { eventCollection } from "../../api/events"
import Header from "../Header"
import { clientCollection } from "../../api/clients"
import { vendorTypeCollection } from "../../api/vendorTypes"
import {
  validatePrice,
  validateZip,
  validatePhone,
  validateEmail,
  validateYear,
  validateTimeSpan,
  validateState,
} from "./validation/eventValidation"
import NavBar from "../NavBar";

import { ToastContainer, toast } from "react-toastify"
import GenerateTasksFromEvent from "../../api/taskHandling/TaskHandler.js"

/* 
This component gets all of the details necessary for creating an event.

Contact datails are added to the client collection.

Event details along with the name stored as {firstname, lastName} and email are stored in event collection.
*/

const CreateNewEvent = () => {
  const [customer, setCustomer] = useState({})
  const [message, setMessage] = useState("Event Created!")
  const [success, setSuccess] = useState(false)

  // const [previousCustomer, setPreviousCustomer] = useState();
  // this will need some refactoring to pull the previous customers from the database and add them to selections

  const tellEmWutsUp = () => {
    toast.warn(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const getData = event => {
    if (event.target.value != "") {
      let client = clientCollection.find({ _id: event.target.value }).fetch()
      console.log(client)
      setCustomer({
        id: client[0]._id,
        firstName: client[0].firstName,
        lastName: client[0].lastName,
        email: client[0].email,
        phoneNum: client[0].phoneNumber,
        address: client[0].address,
        city: client[0].city,
        state: client[0].state,
        zip: client[0].zip,
      })
    } else {
      setCustomer("")
    }
  }

  const handleSubmit = event => {
    event.preventDefault()

    let eventID = ""
    let data = event.target

    // values from contact details
    let newfname = data.fname.value
    let newlname = data.lname.value
    let newEmail = validateEmail(data)
    let newPhoneNum = validatePhone(data)
    let newAddress = data.address.value
    let newCity = data.city.value
    let newState = validateState(data)
    let newZip = validateZip(data)

    //values from event details
    let newDate = validateYear(data)
    let newStartTime = data.startTime.value
    let newStopTime = validateTimeSpan(data, newStartTime)
    let newPrice = validatePrice(data)

    try {
      if (
        newfname &&
        newlname &&
        newEmail &&
        newPhoneNum &&
        newAddress &&
        newCity &&
        newState &&
        newZip &&
        newDate &&
        newStartTime &&
        newStopTime &&
        newPrice
      ) {
        // values from contact details
        data.fname.value = ""
        data.lname.value = ""
        data.email.value = ""
        data.PhoneNum.value = ""
        data.address.value = ""
        data.city.value = ""
        data.state.value = ""
        data.zip.value = ""

        //values from event details
        data.date.value = ""
        data.startTime.value = ""
        data.stopTime.value = ""
        data.price.value = ""

        // Will check if there is a client in the system with the same id
        // if there is not a match, then it will add a new document to the db
        // if there is a match, then the values will be updated this will allow the user to update clients
        let client = clientCollection.upsert(
          { _id: customer.id },
          {
            $set: {
              createdAt: Date.now(),
              firstName: newfname,
              lastName: newlname,
              email: newEmail,
              phoneNumber: newPhoneNum,
              address: newAddress,
              city: newCity,
              state: newState,
              zip: newZip,
            },
          }
        )

        if (client.insertedId) {
          eventID = eventCollection.insert({
            createdAt: Date.now(),
            clientID: client.insertedId,
            name: {
              firstName: newfname,
              lastName: newlname,
            },
            email: newEmail,
            date: newDate,
            startTime: newStartTime,
            stopTime: newStopTime,
            price: newPrice,
          })
          console.log("Event created")
        } else {
          eventID = eventCollection.insert({
            createdAt: Date.now(),
            clientID: customer.id,
            name: {
              firstName: newfname,
              lastName: newlname,
            },
            email: newEmail,
            date: newDate,
            startTime: newStartTime,
            stopTime: newStopTime,
            price: newPrice,
          })
          console.log("Event created")
        }

        //TODO: call the tasks fucntion here????
        console.log(eventID)
        GenerateTasksFromEvent(eventID)

        // adding in the vendors
        let vendorTypes = vendorTypeCollection.find({}).fetch()
        vendorTypes.forEach(vendorType => {
          eventCollection.update(
            { _id: eventID },
            { $set: { [vendorType.name]: null } }
          )
        })
        setSuccess(true)
      } else {
        setSuccess(false)
        console.log("form not completed")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreate = () => {
    if (success) {
      return tellEmWutsUp()
    }
  }

  // get clients from db
  let clients = clientCollection.find({}).fetch()

  return (
    <div>
      <NavBar />
      <Header title="Create New Event" />
      <ToastContainer
        position="top-right"
        autoClose={15000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* section to select previous customers to autofill the contact details */}
      <div>
        <p>If this is a returning customer, select them from the list</p>
        <select
          name="customer"
          id="returning-customer"
          onChange={getData}
          defaultValue=""
        >
          <option value=""></option>
          {clients.map(client => {
            return (
              <option key={client._id} value={client._id}>
                {client.firstName} {client.lastName}
              </option>
            )
          })}
        </select>
      </div>

      <div className="ContactDetails">
        <form onSubmit={handleSubmit}>
          <fieldset className="ContactDetails">
            <legend>Contact Details</legend>
            <div>
              <label>
                First Name <br />
                <input
                  type="input"
                  id="fname"
                  name="fname"
                  defaultValue={customer.firstName}
                ></input>
              </label>
            </div>
            <div>
              <label>
                Last Name <br />
                <input
                  type="input"
                  id="lname"
                  name="lname"
                  defaultValue={customer.lastName}
                ></input>
              </label>
            </div>
            <div>
              <label>
                Email <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={customer.email}
                ></input>
              </label>
            </div>
            <div>
              <label>
                Phone Number <br />
                <input
                  type="input"
                  id="PhoneNum"
                  name="PhoneNum"
                  defaultValue={customer.phoneNum}
                ></input>
              </label>
            </div>
            <div>
              <label>
                Address <br />
                <input
                  type="input"
                  id="address"
                  name="address"
                  defaultValue={customer.address}
                ></input>
              </label>
            </div>
            <div>
              <label>
                City <br />
                <input
                  type="input"
                  id="city"
                  name="city"
                  defaultValue={customer.city}
                ></input>
              </label>
            </div>
            <div>
              <label>
                State <br />
                <input
                  type="input"
                  id="state"
                  name="state"
                  defaultValue={customer.state}
                ></input>
              </label>
            </div>
            <div>
              <label>
                Zip <br />
                <input
                  type="input"
                  id="zip"
                  name="zip"
                  defaultValue={customer.zip}
                ></input>
              </label>
            </div>
          </fieldset>

          <fieldset className="EventDetails">
            <legend>Event Details</legend>
            <div>
              <label>
                Date <br />
                <input type="date" id="date" name="date"></input>
              </label>
            </div>
            <div>
              <label>
                Start Time <br />
                <input type="time" id="startTime" name="startTime"></input>
              </label>
            </div>
            <div>
              <label>
                Stop Time <br />
                <input type="time" id="stopTime" name="stopTime"></input>
              </label>
            </div>
            <div>
              <label>
                Price of Event <br />
                <input type="input" id="price" name="price"></input>
              </label>
            </div>
          </fieldset>
          <div>
            <Link to="/calendar" className="button">
              Cancel
            </Link>
            <button onClick={handleCreate()}>Add Event</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateNewEvent
