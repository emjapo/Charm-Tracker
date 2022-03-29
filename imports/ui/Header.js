import React from "react";

/* 
The header component is called on all internal pages and it is passed a title prop that it renders along with the logo.
*/

const Header = (props) => {
  const { title } = props;
  return (
    <div>
      <div className="header">
        <img
          src="/images/southerncharmslogo.png"
          alt="Southern Charms logo"
        ></img>
        <h1>Charm Tracker</h1>
      </div>
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
