import React from "react";

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
