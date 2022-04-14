import React from "react"
import Header from "../Header"
import { eventCollection } from "../../api/events";
import { clientCollection } from "../../api/clients";
import NavBar from "../NavBar";

/*
Only accessable from the calendar page when an event is selected. The client details will be 
accessed by whatever email is stored in the event doc.
*/


const EditEvent = (props) => {
    const { eventID } = props

    let eventInfo = eventCollection.find({_id: eventID}).fetch()

    eventInfo = eventInfo[0]

    let clientInfo = clientCollection.find({email: eventInfo.email}).fetch()

    clientInfo = clientInfo[0]


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
        // pirce needs the $ stripped if it exists
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

                //Will update the client collection details
                clientCollection.update({ email: eventInfo.email }, {
                    $set: {
                        updatedAt: Date.now(),
                        firstName: newfname,
                        lastName: newlname,
                        email: newEmail,
                        phoneNumber: newPhoneNum,
                        address: newAddress,
                        city: newCity,
                        state: newState,
                        zip: newZip,
                    }
                })

                // will update the event collection 
                eventCollection.update({ _id: eventID}, {
                    $set: {
                    updatedAt: Date.now(),
                    name: {
                        firstName: newfname,
                        lastName: newlname
                    },
                    email: newEmail,
                    date: newDate,
                    startTime: newStartTime,
                    stopTime: newStopTime,
                    price: newPrice,
                }});
                console.log("Event updated");
            } else {
                console.log("form not completed")
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <NavBar />
            <Header title="Edit Event" />

                
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
                                    defaultValue={clientInfo.firstName}
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
                                <input type="email" id="email" name="email" defaultValue={clientInfo.email}></input>
                            </label>
                        </div>
                        <div>
                            <label>
                                Phone Number <br />
                                <input type="input" id="PhoneNum" name="PhoneNum" defaultValue={clientInfo.phoneNum}></input>
                            </label>
                        </div>
                        <div>
                            <label>
                                Address <br />
                                <input type="input" id="address" name="address" defaultValue={clientInfo.address}></input>
                            </label>
                        </div>
                        <div>
                            <label>
                                City <br />
                                <input type="input" id="city" name="city" defaultValue={clientInfo.city}></input>
                            </label>
                        </div>
                        <div>
                            <label>
                                State <br />
                                <input type="input" id="state" name="state" defaultValue={clientInfo.state}></input>
                            </label>
                        </div>
                        <div>
                            <label>
                                Zip <br />
                                <input type="input" id="zip" name="zip" defaultValue={clientInfo.zip}></input>
                            </label>
                        </div>
                    </fieldset>

                    <fieldset className="EventDetails">
                        <legend>Event Details</legend>
                        <div>
                            <label>
                                Date <br />
                                <input type="date" id="date" name="date" defaultValue={eventInfo.date}></input>
                            </label>
                        </div>
                        <div>
                            <label>
                                Start Time <br />
                                <input type="time" id="startTime" name="startTime" defaultValue={eventInfo.startTime}></input>
                            </label>
                        </div>
                        <div>
                            <label>
                                Stop Time <br />
                                <input type="time" id="stopTime" name="stopTime" defaultValue={eventInfo.stopTime}></input>
                            </label>
                        </div>
                        <div>
                            <label>
                                Price of Event <br />
                                <input type="input" id="price" name="price" defaultValue={eventInfo.price}></input>
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


export default EditEvent