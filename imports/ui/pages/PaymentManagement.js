import React, { useState } from "react"
import ReactDom from "react-dom"
import Header from "../Header"
import { eventCollection } from "../../api/events";
import NavBar from "../NavBar";

const PaymentManagement = () => {
  const [client, setClient] = useState()

  // for when the user selects an event
  const getData = event => {
    let element = <p>No event selected</p>
    if (event.target.value != "") {
      let clientevent = eventCollection
        .find({ _id: event.target.value })
        .fetch()
      setClient(event.target.value)
      let price = clientevent[0].price
      if (price.charAt(0) == "$") {
        price = price.substr(1)
      }
      price = parseFloat(price)
      console.log(price, "Price")
      element = <p>$ {clientevent[0].price}</p>
      ReactDom.render(element, document.getElementById("eventCost"))

      if (clientevent[0].amountPaid != undefined) {
        // they have made a previous payment
        let amountPaidElement = <p>$ {clientevent[0].amountPaid}</p>
        ReactDom.render(amountPaidElement, document.getElementById("paid"))

        let remainingElement = <p>$ {price - clientevent[0].amountPaid}</p>
        ReactDom.render(remainingElement, document.getElementById("remaining"))
      } else {
        // no paymnets have been made
        let amountPaidElement = <p>$ 0.00</p>
        ReactDom.render(amountPaidElement, document.getElementById("paid"))

        let remainingElement = <p>$ {price}</p>
        ReactDom.render(remainingElement, document.getElementById("remaining"))
      }
    } else {
      ReactDom.render(element, document.getElementById("eventCost"))
    }
  }

  // for when the user submits a deposit
  const handleDeposit = event => {
    event.preventDefault()

    if (event.target.value != "") {
      let deposit = event.target.depositAmount.value
      event.target.depositAmount.value = ""
      if (deposit.charAt(0) == "$") {
        deposit = deposit.substr(1)
      }
      deposit = parseFloat(deposit)
      if (!isNaN(deposit)) {
        let currentEvent = eventCollection.find({ _id: client }).fetch()

        // clean price value
        let price = currentEvent[0].price
        if (price.charAt(0) == "$") {
          price = price.substr(1)
        }
        price = parseFloat(price)

        if (currentEvent[0].amountPaid != undefined) {
          // has made a payment
          if (currentEvent[0].amountPaid + deposit > price) {
            ReactDom.render(
              <p>
                The amount paid cannot be larger than the price of the event
              </p>,
              document.getElementById("error")
            )
          } else {
            eventCollection.update(
              { _id: client },
              { $inc: { amountPaid: deposit } }
            )
          }
        } else {
          // has not made a payment yet
          if (deposit > price) {
            ReactDom.render(
              <p>
                The amount paid cannot be larger than the price of the event
              </p>,
              document.getElementById("error")
            )
          } else {
            eventCollection.update(
              { _id: client },
              { $set: { amountPaid: deposit } }
            )
          }
        }
        // update the amount paid in UI
        currentEvent = eventCollection.find({ _id: client }).fetch()
        let amountPaidElement = <p>$ {currentEvent[0].amountPaid}</p>
        ReactDom.render(amountPaidElement, document.getElementById("paid"))

        // update the amount remaining in UI
        let remainingElement = <p>$ {price - currentEvent[0].amountPaid}</p>
        ReactDom.render(remainingElement, document.getElementById("remaining"))
      } else {
        ReactDom.render(
          <p>Not a valid input</p>,
          document.getElementById("error")
        )
      }
    }
  }

  let events = eventCollection.find({}).fetch()

  return (
    <div class= "payment">
      <NavBar />
      <Header title="Payment Management" />
      <select name="customer" id="customer" onChange={getData} defaultValue="">
        <option value=""></option>
        {events.map(event => {
          return (
            <option key={event._id} value={event._id}>
              {event.name.firstName} {event.name.lastName} {event.date}
            </option>
          )
        })}
      </select>
      <p class="deposit">New Deposit:</p>
      <div id="error"></div>
      <form class="amountSubmit" onSubmit={handleDeposit}>
        <input type="text" id="insertAmount" name="depositAmount" />
        <button class= "submitpayment">Submit</button>
      </form>
      <div>
      <svg class="svg" width="293" height="62" viewBox="0 0 293 62" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M142.154 34.8605C144.141 31.9724 146.574 29.8365 149.244 28.6361C150.942 27.9196 152.703 27.5782 154.47 27.6232C156.309 27.6232 158.148 27.8012 159.987 27.881C161.514 27.9485 163.04 27.9976 164.575 28.0529C167.857 28.1818 171.139 28.323 174.421 28.4396C176.336 28.5071 178.25 28.5501 180.164 28.5869C184.309 28.6667 188.455 28.7527 192.6 28.7957C197.508 28.8448 202.418 28.8673 207.33 28.8632C210.629 28.8632 213.924 28.7957 217.223 28.7343C220.225 28.6852 223.232 28.6054 226.235 28.5256C228.39 28.4642 230.546 28.3926 232.703 28.3107C235.698 28.1941 238.688 28.059 241.678 27.9301H242.15C242.259 27.9166 242.369 27.9365 242.473 27.9885C242.577 28.0406 242.672 28.1237 242.753 28.2326C242.834 28.3415 242.899 28.474 242.944 28.6216C242.989 28.7692 243.012 28.9287 243.013 29.0903C243.024 29.256 243.012 29.4232 242.977 29.5818C242.943 29.7404 242.887 29.887 242.813 30.0127C242.739 30.1385 242.648 30.2407 242.546 30.3133C242.444 30.3858 242.333 30.4271 242.22 30.4346C241.887 30.4776 241.545 30.4346 241.203 30.4838L232.028 30.8275C229.776 30.9094 227.522 30.981 225.268 31.0424C222.02 31.1201 218.773 31.1917 215.525 31.2572C213.248 31.3002 210.967 31.3432 208.69 31.3616C205.454 31.3616 202.217 31.4107 198.977 31.4045C195.429 31.4045 191.877 31.3677 188.321 31.294C185.099 31.2449 181.877 31.1754 178.654 31.0853C175.38 30.9933 172.111 30.8766 168.841 30.7661C166.061 30.6679 163.288 30.5595 160.521 30.4408C158.594 30.3548 156.672 30.1768 154.745 30.14C152.559 30.0104 150.379 30.554 148.343 31.736C146.763 32.7455 145.296 34.1034 143.994 35.7629C143.218 36.7267 143.243 36.7451 143.748 38.0342C144.787 40.5307 145.494 43.295 145.833 46.18C145.968 47.3229 145.935 48.495 145.737 49.6176C145.598 50.4369 145.304 51.1814 144.889 51.7648C144.474 52.3482 143.955 52.7467 143.393 52.914C142.495 53.2487 141.555 53.2487 140.657 52.914C139.983 52.6898 139.379 52.1402 138.942 51.3527C138.504 50.5652 138.258 49.585 138.243 48.5679C138.184 46.4932 138.477 44.4297 139.097 42.5644C139.648 40.8088 140.311 39.1268 140.949 37.4326C141.012 37.3116 141.043 37.1604 141.034 37.0083C141.026 36.8562 140.979 36.7142 140.903 36.61C139.891 34.8458 138.645 33.4043 137.24 32.3741C135.836 31.3439 134.304 30.7466 132.738 30.6188C131.028 30.4469 129.301 30.5636 127.583 30.6188C125.339 30.6679 123.1 30.7845 120.86 30.8582C118.547 30.9401 116.232 31.0117 113.916 31.0731C110.647 31.1529 107.373 31.2511 104.103 31.2818C97.5305 31.3391 90.9592 31.3738 84.3893 31.3861C82.0122 31.3861 79.635 31.3861 77.262 31.3309C75.3825 31.3063 73.503 31.2695 71.6235 31.2204C68.935 31.159 66.245 31.0874 63.5537 31.0055C60.5398 30.9114 57.5246 30.805 54.508 30.6863C52.9065 30.6249 51.3078 30.5533 49.7119 30.4715C49.51 30.4874 49.3109 30.3974 49.1498 30.2176C48.9886 30.0378 48.8761 29.7797 48.832 29.4893C48.801 29.3055 48.7994 29.1136 48.8272 28.9287C48.855 28.7438 48.9115 28.5709 48.9923 28.4234C49.0731 28.276 49.1759 28.1581 49.2928 28.0789C49.4097 27.9997 49.5374 27.9614 49.6661 27.9669C51.059 28.0099 52.4519 28.0836 53.8365 28.1388C55.3379 28.2002 56.8393 28.2555 58.3406 28.3046L69.3548 28.6238C70.7227 28.6667 72.0948 28.7097 73.4627 28.7281C76.243 28.7691 79.0233 28.8059 81.8036 28.8386C86.216 28.8386 90.6283 28.9123 95.0407 28.9C98.6523 28.9 102.268 28.8325 105.884 28.7711C108.899 28.722 111.919 28.6422 114.934 28.5624C117.127 28.501 119.32 28.4294 121.511 28.3475C124.201 28.2493 126.891 28.1941 129.576 28.0099C131.708 27.822 133.846 28.1476 135.907 28.9737C138.16 29.9443 140.194 31.7889 141.796 34.3142L142.154 34.8605ZM142.234 39.0716C141.929 39.8635 141.666 40.4589 141.458 41.1035C141.074 42.2302 140.73 43.3858 140.428 44.5656C140.204 45.5221 140.046 46.5092 139.957 47.5121C139.773 49.4458 140.449 50.5507 141.767 50.5814C141.996 50.5814 142.225 50.5814 142.455 50.5814C143.522 50.52 144.123 49.6974 144.202 48.126C144.224 47.6469 144.214 47.1659 144.173 46.6895C144.015 45.0491 143.688 43.4534 143.205 41.9567C142.918 41.0482 142.592 40.1397 142.234 39.0716Z" fill="#B8D9C6"/>
        <path d="M35.9034 31.8405C33.7014 32.5403 31.6078 33.2953 29.4934 33.8662C26.3364 34.7195 23.171 35.5114 20.0181 36.2173C17.2773 36.7986 14.513 37.1062 11.7439 37.1381C9.52585 37.2464 7.30662 36.9807 5.12959 36.3462C4.15475 36.0577 3.2154 35.5526 2.34372 34.8484C0.888227 33.6207 0.0541346 31.8405 0.125032 29.2746C0.129334 28.119 0.354058 26.9885 0.773603 26.0117C1.19315 25.0349 1.79065 24.2513 2.49803 23.7499C3.66013 22.891 4.92847 22.3878 6.22642 22.2706C9.20336 21.9462 12.1964 22.2083 15.1262 23.0502C21.92 24.8537 28.5843 27.5891 35.0318 31.2205C35.2695 31.3494 35.4989 31.5029 35.7366 31.6441C35.7944 31.7055 35.8501 31.771 35.9034 31.8405V31.8405Z" fill="#B8D9C6"/>
        <path d="M259.361 30.981C260.383 30.4286 261.396 29.8516 262.422 29.3298C266.94 26.9748 271.558 25.0615 276.247 23.6025C279.409 22.6449 282.591 21.9144 285.839 22.0494C287.483 22.117 289.101 22.4055 290.594 23.535C291.549 24.2292 292.282 25.4446 292.637 26.9225C292.992 28.4004 292.941 30.024 292.495 31.4476C292.073 32.6226 291.403 33.564 290.585 34.1301C289.307 35.0461 287.927 35.6159 286.511 35.8121C283.4 36.2889 280.263 36.2622 277.156 35.7323C271.242 34.8376 265.378 33.3299 259.607 31.2205L259.369 31.1161L259.361 30.981Z" fill="#B8D9C6"/>
        <path d="M38.656 21.3068C37.7093 20.9385 36.7626 20.5824 35.8201 20.2018C31.6277 18.5816 27.5303 16.4693 23.5673 13.8853C21.6027 12.6586 19.775 11.0031 18.1457 8.97449C17.5285 8.20462 17.0296 7.25049 16.6819 6.17532C15.877 3.56031 17.2657 0.521749 19.0465 0.214824C20.0906 0.0772566 21.1415 0.326261 22.1035 0.939168C24.0173 2.11572 25.8132 3.67081 27.4417 5.56147C30.5056 8.99862 33.3784 12.7899 36.0328 16.8993C36.8669 18.127 37.6509 19.4591 38.4558 20.742C38.5434 20.8832 38.6185 21.0428 38.6977 21.1901L38.656 21.3068Z" fill="#B8D9C6"/>
        <path d="M38.7394 40.3669C38.6708 40.5137 38.597 40.6551 38.5183 40.7904C34.8525 46.8 30.9406 52.4167 26.4532 57.1187C24.9591 58.7705 23.3024 60.0767 21.5404 60.9921C20.6818 61.444 19.761 61.5789 18.8588 61.3849C17.2198 60.9675 15.7643 57.9229 16.7735 55.1237C17.2975 53.7708 18.0198 52.607 18.888 51.7169C20.859 49.634 23.0034 47.932 25.2688 46.6527C29.6124 44.07 34.08 41.9649 38.6351 40.3546C38.6351 40.3546 38.681 40.3608 38.7394 40.3669Z" fill="#B8D9C6"/>
        <path d="M256.688 39.0962C258.298 39.753 259.912 40.3791 261.509 41.0789C264.876 42.4776 268.163 44.2654 271.339 46.4256C272.996 47.4983 274.541 48.9143 275.926 50.6305C276.522 51.3674 277.002 52.2844 277.336 53.3191C278.099 55.8728 276.706 58.6904 275.071 58.9298C274.027 59.0348 272.982 58.7542 272.031 58.1133C270.236 56.9594 268.553 55.4587 267.026 53.6506C263.358 49.4612 259.967 44.7687 256.9 39.6364C256.821 39.5013 256.75 39.3601 256.679 39.2251L256.688 39.0962Z" fill="#B8D9C6"/>
        <path d="M256.558 21.2944C257.088 20.4289 257.547 19.6555 258.026 18.9066C260.765 14.5192 263.749 10.4782 266.947 6.82598C268.587 4.87002 270.414 3.27952 272.369 2.10548C273.203 1.62007 274.1 1.41051 274.996 1.49163C276.723 1.6942 278.182 4.69592 277.244 7.36617C276.734 8.70689 276.02 9.85602 275.159 10.7239C273.224 12.7321 271.121 14.366 268.903 15.5856C264.979 17.8875 260.948 19.7747 256.842 21.233L256.558 21.2944Z" fill="#B8D9C6"/>
      </svg>

        <table>
          <tbody>
          <tr>
            <td id="costTitle">
              Event Cost:
            </td>
            <td id="eventCost">
              {/* will render the amount that the event costs */}
            </td>


          </tr>
          <tr>
            <td class="amountTitle">
              Amount Paid:
            </td>
            <td id="paid">
              {/* will render the total amount paid on this event */}
            </td>
          </tr>
          </tbody>
          <tfoot>
            <tr>
              <td id="remainTitle">
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
