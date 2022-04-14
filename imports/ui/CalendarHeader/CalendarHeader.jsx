import React from 'react';
import { Link } from 'react-router-dom';

export const CalendarHeader = ({ onNext, onBack, dateDisplay }) => {

    return(
    <div id= "header">
    

       
    <div id="headerDisplay">

    <img src="/images/logo.svg"
       class="logo"></img>
        <Link className="linkasbutton" to="/create-new-event">Create New Event</Link>
      </div>
      <div id="toggleDays">
      <div id="monthDisplay">{dateDisplay}</div>       

      <button onClick={onBack} id="backButton">Back</button>
        <button onClick={onNext} id="nextButton">Next</button>
        </div>
    </div>    
    );
    };