import React from "react"
import { vendorCollection } from "../api/vendors"
import { vendorTypeCollection } from "../api/vendorTypes"

const VendorSelectionModal = (props) => {
  const { vendorType } = props

  const closeModal = () => {
      document.getElementById("modal-holder").style.display = "none"
  }

  let NewvendorType = vendorTypeCollection.find({name: vendorType}).fetch()
  let vendors = vendorCollection.find({ type: NewvendorType[0]._id }).fetch()

  // return the component
  return (
    <div class="certainVendors" id="myModal">
      <div className="modal-content">
        <span className="close">&times;</span>
              <select name="removeVendorName" id="removeVendorNames">
                  {vendors.map((vendor) => {
                      return (
                          <option key={vendor._id} value={vendor._id}>
                              {vendor.name}
                          </option>
                      );
                  })}
              </select>
              <button onClick={()=> {closeModal()}}>Submit</button>
      </div>
    </div>
  )
}

export default VendorSelectionModal
