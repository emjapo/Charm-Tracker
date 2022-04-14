import React from "react";
import { vendorTypeCollection } from "../api/vendorTypes";
import Swal from "sweetalert2";
import { eventCollection } from "../api/events"


// form for adding vendor types
// should result in a separate form rendering for the vendor type that was added
const RemoveVendorType = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    // sweetalert2 popup that will ask for confirmation
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B8D9C66",
      cancelButtonColor: "#E5E5E5",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let removedVendorType = event.target.removeVendorName.value;
        if (removedVendorType) {
          event.target.removeVendorName.value = "";
          let vendorTypeName = vendorTypeCollection.find({_id: removedVendorType}).fetch()
          vendorTypeName = vendorTypeName[0].name
          vendorTypeCollection.remove({ _id: removedVendorType });

          // remove field from upcoming events
          Meteor.call('vendors.updateEventsRemove', {
            oldVendorType: vendorTypeName,
          }, (err, res) => {
            if (err) {
              alert(err);
            } else {
              console.log(res)// success!
            }
          });

          console.log("Vendor Type removed");
        }
        Swal.fire("Deleted!", "The vendor has been removed.", "success");
      }
    });
  };

  // get the vendor types
  let vendors = vendorTypeCollection.find({}).fetch();

  return (
    <div class="removeVendor">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Remove Vendor Type</legend>
          <select name="removeVendorName" id="removeVendorNames">
            {vendors.map((vendor) => {
              return (
                <option key={vendor._id} value={vendor._id}>
                  {vendor.name}
                </option>
              );
            })}
          </select>
          <button>Remove Vendor Type</button>
        </fieldset>
      </form>
    </div>
  );
};

export default RemoveVendorType;
