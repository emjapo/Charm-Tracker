import React from "react";
import { vendorCollection } from "../api/vendors";

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
                  vendorCollection.remove({ _id: vendor._id });
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
