import React from "react";

/* 
Component that holds the form to collect event details. This same comonent can be used for editing the event details.
*/
const EventDetailsForm = () => {
  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <form>
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
      </form>
    </div>
  );
};

export default EventDetailsForm;
