import React, { Component, useState, useRef } from "react";
import tokenLogo from "../token-logo.png";
// import ethLogo from "../eth-logo.png";
import "../styles/BuyForm.css";
import { useDetectOutsideClick } from "./useDetectOutsideClick";

function BuyForm(props) {
  const [state, setState] = useState({
    output: "0",
  });
  const [input, setInput] = useState(undefined);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [coin, setCoin] = useState(["bitcoin", "ethereum", "ripple", "tether"]);
  const [addCoin, setAddCoin] = useState("bitcoin");

  const onClick = () => setIsActive(!isActive);

  const handleClick = (coin) => {
    setAddCoin(coin);
    setIsActive(false);
  };

  return (
    // <form
    //   className="mb-3"
    //   // onSubmit={(event) => {
    //   //   event.preventDefault();
    //   //   let etherAmount;
    //   //   etherAmount = input.value.toString();
    //   //   etherAmount = window.web3.utils.toWei(etherAmount, "Ether");
    //   //   props.buyTokens(etherAmount);
    //   // }}
    // >
    /* <div>
        <label className="buy_input">
          <b>Input</b>
        </label>
        <span className="input_balance">
          Balance: {window.web3.utils.fromWei(props.ethBalance, "Ether")}
        </span>
      </div>  <div className="input-group mb-4">
         <input
          type="text"
          onChange={(event) => {
            const etherAmount = input.value.toString();
            setState({
              output: etherAmount * 100,
            });
          }}
          ref={(input) => {
            setInput(input);
          }}
          className="input_value_placeholder"
          placeholder="0"
          // required
        /> */
    <div className="container">
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>{addCoin}</span>
          <img
            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
            alt="User avatar"
          />
        </button>
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            {coin.map((el) => {
              return (
                <li>
                  <a
                    onClick={() => handleClick(el)}
                    href=""
                    className="dropdown-item"
                  >
                    {el}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
    // </div>
    /* <div>
        <label className="output">
          <b>Output</b>
        </label>
        <span className="output_balance">
          Balance: {window.web3.utils.fromWei(props.tokenBalance, "Ether")}
        </span>
      </div>
      <div className="output_placeholder">
        <input
          type="text"
          className="output_value_placeholder"
          placeholder="0"
          value={state.output}
          disabled
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <img src={tokenLogo} height="32" alt="" />
            &nbsp; DApp
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-block btn-lg">
        SWAP!
      </button> */
    // </form>
  );
  // }
}

export default BuyForm;
