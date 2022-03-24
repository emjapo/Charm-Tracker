import React from "react"
import { vendorTypeCollection } from "../api/vendorTypes"

// form for adding vendor types
// should result in a separate form rendering for the vendor type that was added
const AddVendorType = () => {
  const handleSubmit = event => {
    event.preventDefault()
    let newVendorType = event.target.vendorTypeName.value
    if (newVendorType) {
      event.target.vendorTypeName.value = ""
      vendorTypeCollection.insert({
        createdAt: Date.now(),
        name: newVendorType,
      })
      console.log("Vendor Type added")
    }
  }

  return (
    <div>
      <form id="email-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Add Vendor Type</legend>
          <input type="text" name="vendorTypeName"></input>
          <button>Add Vendor Type</button>
          <button type="submit" class="btn btn-primary">
            Email Me a Ting
          </button>
        </fieldset>
      </form>
    </div>
  )
}

export default AddVendorType
