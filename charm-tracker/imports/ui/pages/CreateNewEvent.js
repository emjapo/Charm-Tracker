import React, { useState } from "react";
import ContactDetailsForm from "../ContactDetailsForm";
import EventDetailsForm from "../EventDetailsForm";
import { Link } from "react-router-dom";
import { eventCollection } from "../../api/events";
import Header from "../Header";
import { clientCollection } from "../../api/clients";

/* 
This component gets all of the details necessary for creating an event.

Contact datails are added to the client collection.

Event details along with the name stored as {firstname, lastName} and email are stored in event collection.
*/

const CreateNewEvent = () => {
  const [customer, setCustomer] = useState({});
  // const [previousCustomer, setPreviousCustomer] = useState();
  // this will need some refactoring to pull the previous customers from the database and add them to selections

  const getData = (event) => {
    if (event.target.value != "") {
      let client = clientCollection.find({ _id: event.target.value }).fetch()
      console.log(client)
      setCustomer({id: client[0]._id,  firstName: client[0].firstName, lastName: client[0].lastName, email: client[0].email, phoneNum: client[0].phoneNumber, address: client[0].address, city: client[0].city, state: client[0].state, zip: client[0].zip })
    } else {
      setCustomer("")
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault()

    // values from contact details
    let newfname = event.target.fname.value;
    let newlname = event.target.lname.value;
    let newEmail = event.target.email.value;
    let newPhoneNum = event.target.PhoneNum.value;
    let newAddress = event.target.address.value;
    let newCity = event.target.city.value;
    let newState = event.target.state.value;
    let newZip = event.target.zip.value;

    //values from event details
    let newDate = event.target.date.value;
    let newStartTime = event.target.startTime.value;
    let newStopTime = event.target.stopTime.value;
    let newPrice = event.target.price.value;

    try {
      if (newfname && newlname && newEmail && newPhoneNum && newAddress && newCity && newState && newZip && newDate && newStartTime && newStopTime && newPrice) {
        // values from contact details
        event.target.fname.value = "";
        event.target.lname.value = "";
        event.target.email.value = "";
        event.target.PhoneNum.value = "";
        event.target.address.value = "";
        event.target.city.value = "";
        event.target.state.value = "";
        event.target.zip.value = "";

        //values from event details
        event.target.date.value = "";
        event.target.startTime.value = "";
        event.target.stopTime.value = "";
        event.target.price.value = "";

        // Will check if there is a client in the system with the same id
        // if there is not a match, then it will add a new document to the db
        // if there is a match, then the values will be updated this will allow the user to update clients
        clientCollection.upsert({ _id: customer.id }, { $set: {
          createdAt: Date.now(),
          firstName: newfname,
          lastName: newlname,
          email: newEmail,
          phoneNumber: newPhoneNum,
          address: newAddress,
          city: newCity,
          state: newState,
          zip: newZip,
        }})

        eventCollection.insert({
          createdAt: Date.now(),
          name: {firstName: newfname,
                lastName: newlname},
          email: newEmail,
          date: newDate,
          startTime: newStartTime,
          stopTime: newStopTime,
          price: newPrice,
        });
        console.log("Event created");
      } else {
        console.log("form not completed")
      }
    } catch (error) {
      console.log(error);
    }
  }

  // get clients from db
  let clients = clientCollection.find({}).fetch();

  return (
    <div>
      <Header title="Create New Event" />

      {/* section to select previous customers to autofill the contact details */}
      <div>
        <p>If this is a returning customer, select them from the list</p>
        <select
          name="customer"
          id="returning-customer"
          onChange={getData}
          defaultValue=""
        >
          <option value="" ></option>
            {clients.map((client) => {
              return (
                <option key={client._id} value={client._id}>
                  {client.firstName} {client.lastName}
                </option>
              );
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
                <input type="input" id="lname" name="lname" defaultValue={customer.lastName}></input>
              </label>
            </div>
            <div>
              <label>
                Email <br />
                <input type="email" id="email" name="email" defaultValue={customer.email}></input>
              </label>
            </div>
            <div>
              <label>
                Phone Number <br />
                <input type="input" id="PhoneNum" name="PhoneNum" defaultValue={customer.phoneNum}></input>
              </label>
            </div>
            <div>
              <label>
                Address <br />
                <input type="input" id="address" name="address" defaultValue={customer.address}></input>
              </label>
            </div>
            <div>
              <label>
                City <br />
                <input type="input" id="city" name="city" defaultValue={customer.city}></input>
              </label>
            </div>
            <div>
              <label>
                State <br />
                <input type="input" id="state" name="state" defaultValue={customer.state}></input>
              </label>
            </div>
            <div>
              <label>
                Zip <br />
                <input type="input" id="zip" name="zip" defaultValue={customer.zip}></input>
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
                Start Time <br />
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
            <Link to="/calendar" className="button">Cancel</Link>
            <button>
              Add Event
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CreateNewEvent;
