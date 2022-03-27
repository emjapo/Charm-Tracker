import React from "react";

/* 
This is what will be printed when a client has been searched in the reports
*/

const ClientReport = (props) => {
    const { reports } = props;
    return (
        <div>
            {
                reports.map((client) => {
                    return (
                        <ul key={client._id}>
                            <li>Name: {client.firstName} {client.lastName}</li>
                            <li>Email: {client.email}</li>
                            <li>Phone Number: {client.phoneNumber}</li>
                            <li>Address: {client.address}</li>
                            <li>City: {client.city}</li>
                            <li>State: {client.state}</li>
                            <li>Zip: {client.zip}</li>
                            <li>Created at: {client.createdAt}</li>
                        </ul>
                    );
                })
            }
        </div>
    );
};

export default ClientReport;