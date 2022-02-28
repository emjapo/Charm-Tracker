import React from "react"
import { vendorTypeCollection } from "../api/vendorTypes"

// form for adding vendor types
// should result in a separate form rendering for the vendor type that was added
const RemoveVendorType = () => {


    const handleSubmit = (event) => {
        event.preventDefault()
        let removedVendorType = event.target.removeVendorName.value
        if (removedVendorType) {
            event.target.removeVendorName.value = "";
            vendorTypeCollection.remove({ _id: removedVendorType });
            console.log("Vendor Type removed")
        }
    }

    // get the vendor types
    let vendors = vendorTypeCollection.find({ }).fetch();

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Remove Vendor Type</legend>
                    <select name="removeVendorName" id="removeVendorNames">
                        {vendors.map((vendor) => {
                            return (
                                <option key={vendor._id} value={vendor._id}>{vendor.name}</option>
                            )
                        })}
                    </select>
                    <button>Remove Vendor Type</button>
                </fieldset>
            </form>
        </div>
    )
}

export default RemoveVendorType