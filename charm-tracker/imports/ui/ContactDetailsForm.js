import React from "react";

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
