import React from "react"
import Header from "../Header"
import { eventCollection } from "../../api/events"
import { clientCollection } from "../../api/clients"
import ClientReport from "../ClientReport"
import EventReports from "../EventReports"
import ReactDom from "react-dom"
import NavBar from "../NavBar"

const Reports = () => {
  // stores report info from event collection
  let report = []

  // stores report info from client collection
  let clientReport = []

  const handleSubmit = (event) => {
    event.preventDefault()

    let startDate = event.target.startDate.value
    let stopDate = event.target.stopDate.value
    let email = event.target.clientEmail.value

    console.log(startDate, ":", stopDate, ":", email)

    // value entered for start date and stop date, but not email
    if (startDate != "" && stopDate != "" && email == "") {
      report = eventCollection
        .find({ date: { $gte: startDate, $lte: stopDate } })
        .fetch()

      //render
      let eventReportEl = <EventReports reports={report} />
      ReactDom.render(eventReportEl, document.getElementById("eventReports"))

      // value entered in just for email and not for start date or stop date
    } else if (email != "" && startDate == "" && stopDate == "") {
      clientReport = clientCollection.find({ email: email }).fetch()
      console.log("id", clientReport[0]._id)
      report = eventCollection.find({ clientID: clientReport[0]._id }).fetch()

      //render
      let clientReportEl = <ClientReport reports={clientReport} />
      let eventReportEl = <EventReports reports={report} />
      ReactDom.render(clientReportEl, document.getElementById("reports"))
      ReactDom.render(eventReportEl, document.getElementById("eventReports"))

      // value entered in for all of the filter options
    } else if (email != "" && startDate != "" && stopDate != "") {
      clientReport = clientCollection.find({ email: email }).fetch()
      report = eventCollection
        .find({
          $and: [
            { clientID: clientReport[0]._id },
            { date: { $gte: startDate, $lte: stopDate } },
          ],
        })
        .fetch()

      //render
      let clientReportEl = <ClientReport reports={clientReport} />
      let eventReportEl = <EventReports reports={report} />
      ReactDom.render(clientReportEl, document.getElementById("reports"))
      ReactDom.render(eventReportEl, document.getElementById("eventReports"))

      // Start date entered only
    } else if (startDate != "" && stopDate == "" && email == "") {
      report = eventCollection.find({ date: { $gte: startDate } }).fetch()

      //render
      let eventReportEl = <EventReports reports={report} />
      ReactDom.render(eventReportEl, document.getElementById("eventReports"))

      // Stop date entered only
    } else if (startDate == "" && stopDate != "" && email == "") {
      report = eventCollection.find({ date: { $lte: stopDate } }).fetch()

      //render
      let eventReportEl = <EventReports reports={report} />
      ReactDom.render(eventReportEl, document.getElementById("eventReports"))

      // Start date entered with email
    } else if (startDate != "" && stopDate == "" && email != "") {
      clientReport = clientCollection.find({ email: email }).fetch()
      report = eventCollection
        .find({
          $and: [
            { clientID: clientReport[0]._id },
            { date: { $gte: startDate } },
          ],
        })
        .fetch()

      //render
      let clientReportEl = <ClientReport reports={clientReport} />
      let eventReportEl = <EventReports reports={report} />
      ReactDom.render(clientReportEl, document.getElementById("reports"))
      ReactDom.render(eventReportEl, document.getElementById("eventReports"))

      // Stop date entered with email
    } else if (startDate == "" && stopDate != "" && email != "") {
      clientReport = clientCollection.find({ email: email }).fetch()
      report = eventCollection
        .find({
          $and: [
            { clientID: clientReport[0]._id },
            { date: { $lte: stopDate } },
          ],
        })
        .fetch()

      //render
      let clientReportEl = <ClientReport reports={clientReport} />
      let eventReportEl = <EventReports reports={report} />
      ReactDom.render(clientReportEl, document.getElementById("reports"))
      ReactDom.render(eventReportEl, document.getElementById("eventReports"))
    } else {
      console.log("error, no filter selected")
    }
    console.log(report)
  }

  return (
    <div>
      <NavBar />
      <Header title="Reports" />
      <form onSubmit={handleSubmit}>
        {/* filters input */}
        <label className="dateFilter">Start Date:
          <input type="date" class= "startDate" name="startDate"></input>
        </label>
        <label className="dateFilter">Stop Date:
          <input type="date" class= "stopDate" name="stopDate"></input>
        </label>

        <label className="nameFilter">Email
          <input class="email" type="text" name="clientEmail"></input>
        </label>

        <button class= "search">Search</button>
      </form>

      {/* reports rendered here */}

      <div id="reports"></div>
      <div id="eventReports"></div>

      {/* print button */}
      <button class="print" onClick={() => window.print()}>Print this page</button>
    </div>
  )
}

export default Reports
