import { Meteor } from "meteor/meteor"

import { eventCollection } from "./../imports/api/events"
import { clientCollection } from "./../imports/api/clients"
import { vendorCollection } from "../imports/api/vendors"
import { vendorTypeCollection } from "../imports/api/vendorTypes"

function insertEvent({ date, startTime, endTime, price }) {
  eventsCollection.insert({
    date,
    startTime,
    endTime,
    price,
    createdAt: new Date(),
  })
}

function insertClient({
  firstName,
  lastName,
  email,
  phoneNum,
  street,
  city,
  state,
  zip,
}) {
  clientCollection.insert({
    firstName,
    lastName,
    email,
    phoneNumber,
    street,
    city,
    state,
    zip,
    createdAt: new Date(),
  })
}

//vendorType: ID of the vendorType for th evendor in the venderType collection
//vendorName: name of the vendor
function insertVendors({ vendorType, vendorName }) {
  vendorCollection.insert({ vendorType, vendorName, createdAt: new Date() })
}

//vendorType: string containing the type of vendor
function insertVendors({ vendorType }) {
  vendorTypeCollection.insert({ vendorType, createdAt: new Date() })
}

Meteor.startup(() => {
  //Synchronize 'events' collection with every subscriber
  Meteor.publish("events/all", function () {
    return eventCollection.find()
  })

  //Synchronize 'clients' collection with every subscriber
  Meteor.publish("clients/all", function () {
    return clientCollection.find()
  })

  //Synchronize 'vendors' collection with every subscriber
  Meteor.publish("vendors/all", function () {
    return vendorCollection.find()
  })

  //Synchronize 'vendorTypes' collection with every subscriber
  Meteor.publish("vendorTypes/all", function () {
    return vendorTypeCollection.find()
  })
})

if (Meteor.isClient) {
  Template.email.event({
    "submit #email-form": function (e, t) {
      e.preventDefault()
      var toAddr = "gerald.wheaton20@gmail.com" //t.find("#inputEmail")
      var subj = "Definitely not phishing" //t.find("#inputSubject")
      var body = "Wuts up NeeErrrRRRd" //t.find("#inputBody")
      Meteor.call("sendEmail", toAddr, subj, body)
    },
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    process.env.MAIL_URL =
      "smtp://postmaster@sandboxd7fdeb2dd07648928b006422e647c10d.mailgun.org:e5339fb85dcc027e938ae6f42004725f-0677517f-f029a2a2@smtp.mailgun.org:587"

    Account.emailTemplate.from = "no-reply@localhost3000.com"
    Account.emailTemplate.sitename = "LuckyCharms"
    Account.emailTemplate.verifyEmail.subject = function (user) {
      return "test email"
    }
    Account.emailTemplate.verifyEmail.text = function (user, url) {
      return "Click the following link. I promise its not phishing" + url
    }
    Account.config({
      sendVerificationEmail: true,
    })
  })

  Meteor.methods({
    sendEmail: function (to, subj, text) {
      this.unblock()

      Email.send({
        to: to,
        from: "no-reply@localhost3000.com",
        subject: subj,
        text: text,
      })
    },
  })
}
