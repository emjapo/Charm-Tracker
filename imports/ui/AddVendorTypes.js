import React from "react"
import { Meteor } from 'meteor/meteor';
import { vendorTypeCollection } from "../api/vendorTypes"
import { eventCollection } from "../api/events";

// form for adding vendor types
// should result in a separate form rendering for the vendor type that was added
const AddVendorType = () => {


    const handleSubmit = (event) => {
        event.preventDefault()
        let newVendorType = event.target.vendorTypeName.value
        if (newVendorType) {
            event.target.vendorTypeName.value = "";
            vendorTypeCollection.insert({
                createdAt: Date.now(),
                name: newVendorType,
            });
            console.log("Vendor Type added")

            // update events that have not occurred by adding the field for the new vendor type equal to null
            Meteor.call('vendors.updateEventsAdd', {
                newVendorType: newVendorType,
            }, (err, res) => {
                if (err) {
                    alert(err);
                } else {
                    console.log(res)// success!
                }
            });
        }
    }


    return (
        <div class="editVendors">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Add Vendor Type</legend>
                    <input type="text" id="vendorName" name="vendorTypeName"></input>
                    <button >Add Vendor Type</button>
                </fieldset>
            </form>
        </div>
    )
}

export default AddVendorType