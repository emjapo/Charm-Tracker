import React from "react"
import Header from "../Header"
import VendorTypeList from "../VendorTypeList"
import { vendorTypeCollection } from "../../api/vendorTypes"
import AddVendorType from "../AddVendorTypes"
import RemoveVendorType from "../RemoveVendorTypes"
import NavBar from "../NavBar"

const EditVendors = () => {

  // get list of vendor types from the vendor type db
  let vendors = vendorTypeCollection.find({}).fetch();

  return (
    <div>
      <NavBar />
      <Header title="Edit Vendors" />

      {/* Form for adding vendor types */}
      <AddVendorType />
      {/* Form for removing vendor types */}
      <RemoveVendorType />

      {/* render the vendortype form for each vendor type */}
      {vendors.map((vendor) => {
        return(
          <VendorTypeList key={vendor._id} vendorTypeID={vendor._id} vendorTypeName={vendor.name} /> 
        )
      })}
    </div>
  )
}

export default EditVendors
