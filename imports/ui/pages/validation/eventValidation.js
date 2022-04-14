import React, { useState } from "react"
import validator from "validator"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// typeError may be set to either "emptyField" for "invalidField"
const invalidField = (value, typeError) => {
  const options = {
    autoClose: 2000,
    className: "",
    position: toast.POSITION.TOP_RIGHT,
  }

  switch (typeError) {
    case "invalidField":
      toast.error(`Enter valid ${value}`, options)
      break
    case "emptyField":
      toast.error(`Please fill in the ${value} field`, options)
      break
  }
}

const stripPrice = data => {
  let price = data.price.value

  let strippedPrice =
    price.includes("$") || price.includes(",")
      ? price.replaceAll("$", "").replaceAll(",", "")
      : price
  return strippedPrice
}

const validatePrice = data => {
  let price = stripPrice(data)
  if (isNaN(price)) {
    invalidField("PRICE", "invalidField")
    return ""
  }
  return price
}

const validateZip = data => {
  // define zipcode as regular expressions
  let fiveDigZip = new RegExp("^[0-9]{5}$")
  let nineDigZip = new RegExp("^[0-9]{5}[-][0-9]{5}$")

  if (!fiveDigZip.test(data.zip.value) && !nineDigZip.test(data.zip.value)) {
    invalidField("ZIP CODE", "invalidField")
    return ""
  }

  return data.zip.value
}

const validatePhone = data => {
  if (!validator.isMobilePhone(data.PhoneNum.value)) {
    invalidField("PHONE NUMBER", "invalidField")
    return ""
  }
  return data.PhoneNum.value
}

const validateEmail = data => {
  if (!validator.isEmail(data.email.value)) {
    invalidField("EMAIL", "invalidField")
    return ""
  }
  return data.email.value
}

const validateYear = data => {
  let currYear = new Date().getFullYear()
  let selectedYear = data.date.value.substring(0, 4)

  if (selectedYear < currYear) {
    invalidField("YEAR", "invalidField")
    return ""
  }
  return data.date.value
}

const validateTimeSpan = (data, startTime) => {
  let validTimeSpan =
    data.stopTime.value.replaceAll(":", "") > startTime.replaceAll(":", "")
      ? true
      : false
  if (!validTimeSpan) {
    invalidField("STOP TIME", "invalidField")
    return ""
  }
  return data.stopTime.value
}

const preventEmptyField = (fieldValue, fieldName) => {
  if (!fieldValue) {
    invalidField(fieldName, "emptyField")
    return ""
  }
  return fieldValue
}

const validateState = data => {
  let states = [
    "AL",
    "AK",
    "AS",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FM",
    "FL",
    "GA",
    "GU",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MH",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "MP",
    "OH",
    "OK",
    "OR",
    "PW",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VI",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ]

  if (!states.includes(data.state.value)) {
    invalidField("STATE", "invalidField")
    return ""
  }
  return data.state.value
}

export {
  validatePrice,
  validateZip,
  validatePhone,
  validateEmail,
  validateYear,
  validateTimeSpan,
  validateState,
  preventEmptyField,
}
