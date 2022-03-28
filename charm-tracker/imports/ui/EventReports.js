import React from "react";

/* 
This is what will be printed for the reports for the events that are selected
*/

const EventReports = (props) => {
    const { reports } = props;
    return (
        <div>
            {
                reports.map((event) => {
                    return (
                        <ul key={event._id}>
                            <li>Name: {event.name.firstName} {event.name.lastName}</li>
                            <li>Email: {event.email}</li>
                            <li>Date: {event.date}</li>
                            <li>Start Time: {event.startTime}</li>
                            <li>Stop Time: {event.stopTime}</li>
                            <li>Price: {event.price}</li>
                            <li>Amount Paid: ${event.amountPaid}</li>
                        </ul>
                    );
                })
            }
        </div>
    );
};

export default EventReports;