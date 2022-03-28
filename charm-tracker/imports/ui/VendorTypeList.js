import React from "react";
import { vendorCollection } from "../api/vendors";
import Swal from "sweetalert2";

// will output the list of vendors of that type along with an input to add more and the ability to delete current vendors
const VendorTypeList = (props) => {
  const { vendorTypeID, vendorTypeName } = props;

  //handles form and adds value to db
  const handleSubmit = (event) => {
    event.preventDefault();
    let newVendor = event.target.vendorName.value;
    console.log(newVendor);
    try {
      if (newVendor) {
        event.target.vendorName.value = "";
        vendorCollection.insert({
          createdAt: Date.now(),
          name: newVendor,
          type: vendorTypeID,
        });
        console.log("vendor added to list");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get the vendors with the passed in type
  let vendors = vendorCollection.find({ type: vendorTypeID }).fetch();

  // return the component
  return (
    <div>
      <fieldset className="vendor">
        <legend>{vendorTypeName}</legend>

        {/* render the names of the vendors along with the delete functions for them */}
        {vendors.map((vendor) => {
          return (
            <div key={vendor._id}>
              <button
                onClick={() => {
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
                      vendorCollection.remove({ _id: vendor._id });
                      Swal.fire(
                        "Deleted!",
                        "The vendor has been removed.",
                        "success"
                      );
                    }
                  });
                }}
              >
                X
              </button>
              {vendor.name}
            </div>
          );
        })}

        {/* input and submit vendor names */}
        <form onSubmit={handleSubmit}>
          <input type="text" name="vendorName" />
          <button>Add {vendorTypeName}</button>
        </form>
      </fieldset>
    </div>
  );
};

export default VendorTypeList;
