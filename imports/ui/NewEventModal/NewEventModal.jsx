import React, { useState } from 'react';
import { eventCollection } from "../../api/events";


export const NewEventModal = ({ onSave, onClose, clicked }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(false);
  
  //convert "clicked" to date format used in event collection
  let splitDate = clicked.split("/")

  let length = splitDate[0].length
  if(length < 2) {
    splitDate[0] = "0" + splitDate[0]
  }

  length = splitDate[1].length
  if(length < 2) {
    splitDate[1] = "0" + splitDate[1]
  }

  let formattedDate = [splitDate[2], splitDate[0], splitDate[1]]
  let fDate = formattedDate.join("-")

  //const evt = eventCollection.find({date: fDate}).fetch() 

  return(
    <>
      <div id="newEventModal">
        <h2>Create a New Event?</h2>

        <input 
          className={error ? 'error' : ''}
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          id="eventTitleInput" 
          placeholder="Event Title" 
        />

        <button 
          onClick={() => {
            if (title) {
              setError(false);
              onSave(title);
            } else {
              setError(true);
            }
          }} 
          id="saveButton">Create</button>


        <button 
          onClick={onClose}
          id="cancelButton">Cancel</button>
      </div>

      <div id="modalBackDrop"></div>
    </>
  );
};