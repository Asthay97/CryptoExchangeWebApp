import React from "react";
import Identicon from "identicon.js";
import photo from "../webapp-logo.png";
import "../styles/Navbar.css";

function Navbar(props) {
  return (
    <div className="navbar">
      <img src={photo} className="navbar_img" alt="" />
      <h5>CRYPTO TOKEN EXCHANGE</h5>
      <div className="navbar_account">
        <div className="account">{props.account}</div>
        <div>
          {props.account ? (
            <img
              className="navbar_account_icon"
              alt="alternate text"
              src={`data:image/png;base64,${new Identicon(
                props.account,
                30
              ).toString()}`}
            />
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
