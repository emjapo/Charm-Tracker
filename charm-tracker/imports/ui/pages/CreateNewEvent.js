import React, { useState } from "react";
import ContactDetailsForm from "../ContactDetailsForm";
import EventDetailsForm from "../EventDetailsForm";
import Header from "../Header";

const CreateNewEvent = () => {
  const [previousCustomer, setPreviousCustomer] = useState();
  // this will need some refactoring to pull the previous customers from the database and add them to selections
  return (
    <div>
      <Header title="Create New Event" />

      {/* section to select previous customers to autofill the contact details */}
      <div>
        <p>If this is a returning customer, select them from the list</p>
        <select
          name="customer"
          id="returning-customer"
          onChange={(event) => setPreviousCustomer(event.target.value)}
        >
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      <ContactDetailsForm previousCustomer={previousCustomer} />
      <EventDetailsForm />
      <div>
        <button>Cancel</button>
        <button onClick={() => console.log(previousCustomer)}>Add Event</button>
      </div>
    </div>
  );
};

export default CreateNewEvent;
