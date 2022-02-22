import React from "react";

/*
Collects the contact details that are used for creating an event. 
It is passed in an optional prop of previousCustomer whenever a name 
is selected from the dropdown menu.

For further work: 
  the previous customer prop needs to be used to get the customer details from the database.
  That information will then be used to populate the default values of the rest of the form.
*/

const ContactDetailsForm = (props) => {
  return (
    <div>
      <form>
        <fieldset className="ContactDetails">
          <legend>Contact Details</legend>
          <div>
            <label>
              First Name <br />
              <input
                type="input"
                id="fname"
                name="fname"
                defaultValue={props.previousCustomer}
              ></input>
            </label>
          </div>
          <div>
            <label>
              Last Name <br />
              <input type="input" id="lname" name="lname"></input>
            </label>
          </div>
          <div>
            <label>
              Email <br />
              <input type="email" id="email" name="email"></input>
            </label>
          </div>
          <div>
            <label>
              Phone Number <br />
              <input type="input" id="PhoneNum" name="PhoneNum"></input>
            </label>
          </div>
          <div>
            <label>
              Address <br />
              <input type="input" id="address" name="address"></input>
            </label>
          </div>
          <div>
            <label>
              City <br />
              <input type="input" id="city" name="city"></input>
            </label>
          </div>
          <div>
            <label>
              State <br />
              <input type="input" id="state" name="state"></input>
            </label>
          </div>
          <div>
            <label>
              Zip <br />
              <input type="input" id="zip" name="zip"></input>
            </label>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default ContactDetailsForm;
