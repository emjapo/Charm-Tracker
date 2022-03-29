import React, { useState } from "react";
import ReactDom from 'react-dom';
import Header from "../Header"
import { clientCollection } from "../../api/clients"
import { eventCollection } from "../../api/events";

const PaymentManagement = () => {
  const [client, setClient] = useState();

  // for when the user selects an event
  const getData = (event) => {
    let element = <p>No event selected</p>
    if (event.target.value != "") {
      let clientevent = eventCollection.find({ _id: event.target.value }).fetch()
      setClient(event.target.value)
      let price = clientevent[0].price
      if (price.charAt(0) == '$') {
        price = price.substr(1);
      }
      price = parseFloat(price)
      console.log(price, "Price")
      element = <p>$ {clientevent[0].price}</p>
      ReactDom.render(element, document.getElementById('eventCost'));

      if (clientevent[0].amountPaid != undefined) {
        // they have made a previous payment
        let amountPaidElement = <p>$ {clientevent[0].amountPaid}</p>
        ReactDom.render(amountPaidElement, document.getElementById('paid'));

        let remainingElement = <p>$ {price - clientevent[0].amountPaid}</p>
        ReactDom.render(remainingElement, document.getElementById('remaining'));
      } else {
        // no paymnets have been made
        let amountPaidElement = <p>$ 0.00</p>
        ReactDom.render(amountPaidElement, document.getElementById('paid'));

        let remainingElement = <p>$ {price}</p>
        ReactDom.render(remainingElement, document.getElementById('remaining'));
      }
    } else {
      ReactDom.render(element, document.getElementById('eventCost'));
    }
  }

  // for when the user submits a deposit
  const handleDeposit = (event) => {
    event.preventDefault()

    if (event.target.value != "") {
      let deposit = event.target.depositAmount.value
      event.target.depositAmount.value = ""
      if (deposit.charAt(0) == '$') {
        deposit = deposit.substr(1);
      }
      deposit = parseFloat(deposit)
      if (!isNaN(deposit)) {
        let currentEvent = eventCollection.find({ _id: client }).fetch();

        // clean price value
        let price = currentEvent[0].price
        if (price.charAt(0) == '$') {
          price = price.substr(1);
        }
        price = parseFloat(price)

        if (currentEvent[0].amountPaid != undefined) {
          // has made a payment
          if (currentEvent[0].amountPaid + deposit > price){
            ReactDom.render(<p>The amount paid cannot be larger than the price of the event</p>, document.getElementById('error'))
          } else {
            eventCollection.update({ _id: client }, { $inc: { amountPaid: deposit } })
          }
        } else {
          // has not made a payment yet
          if (deposit > price) {
            ReactDom.render(<p>The amount paid cannot be larger than the price of the event</p>, document.getElementById('error'))
          } else {
            eventCollection.update({ _id: client }, { $set: { amountPaid: deposit } })
          }
        }
        // update the amount paid in UI
        currentEvent = eventCollection.find({ _id: client }).fetch();
        let amountPaidElement = <p>$ {currentEvent[0].amountPaid}</p>
        ReactDom.render(amountPaidElement, document.getElementById('paid'));

        // update the amount remaining in UI
        let remainingElement = <p>$ {price - currentEvent[0].amountPaid}</p>
        ReactDom.render(remainingElement, document.getElementById('remaining'));
      }
      else {
        ReactDom.render(<p>Not a valid input</p>, document.getElementById('error'))
      }
    }
  }

  let events = eventCollection.find({}).fetch();


  return (
    <div>
      <Header title="Payment Management" />
      <select
        name="customer"
        id="customer"
        onChange={getData}
        defaultValue=""
      >
        <option value="" ></option>
        {events.map((event) => {
          return (
            <option key={event._id} value={event._id}>
              {event.name.firstName} {event.name.lastName} {event.date}
            </option>
          );
        })}
      </select>
      <p>New deposit:</p>
      <div id="error"></div>
      <form onSubmit={handleDeposit}>
        <input type="text" name="depositAmount" />
        <button>Submit</button>
      </form>
      <div>
        <table>
          <tbody>
          <tr>
            <td>
              Event Cost:
            </td>
            <td id="eventCost">
              {/* will render the amount that the event costs */}
            </td>
          </tr>
          <tr>
            <td>
              Amount Paid:
            </td>
            <td id="paid">
              {/* will render the total amount paid on this event */}
            </td>
          </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                Cost Remaining:
              </td>
              <td id="remaining">
                {/* the event cost minus the amount paid will be rendered here */}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default PaymentManagement
