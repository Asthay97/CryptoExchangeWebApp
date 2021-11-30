import React, { useState } from "react";
import tokenLogo from "../token-logo.png";
import ethLogo from "../eth-logo.png";
import "../styles/BuyForm.css";

function BuyForm(props) {
  const [state, setState] = useState({
    output: "0",
  });
  const [input, setInput] = useState(undefined);
  return (
    <div className="buy_app">
      <form
        className="buy_form"
        onSubmit={(event) => {
          event.preventDefault();
          let etherAmount;
          etherAmount = input.value.toString();
          etherAmount = window.web3.utils.toWei(etherAmount, "Ether");
          props.buyTokens(etherAmount);
        }}
      >
        <div>
          <label className="buy_input">
            <b>Input</b>
          </label>
          <span className="input_balance">
            Balance: {window.web3.utils.fromWei(props.ethBalance, "Ether")}
          </span>
        </div>
        <div className="input_placeholder">
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
            required
          />
          {/* <div className="input-group-append">
            <div className="input-group-text">
              <img src={ethLogo} height="32" alt="" />
              &nbsp;&nbsp;&nbsp; ETH
            </div>
          </div> */}
        </div>
        <div>
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
          {/* <div className="input-group-append">
            <div className="input-group-text">
              <img src={tokenLogo} height="32" alt="" />
              &nbsp; DApp
            </div>
          </div> */}
        </div>
        {/* <div className="mb-5">
          <span className="float-left text-muted">Exchange Rate</span>
          <span className="float-right text-muted">1 ETH = 100 DApp</span>
        </div> */}
        <button type="submit" className="submit_button">
          SWAP TOKEN
        </button>
      </form>
      <div className="input_menu">
        <button className="menu-trigger">
          <span>Ether</span>
          <img
            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
            alt="User avatar"
          />
        </button>
      </div>
      <div className="output_menu">
        <button className="menu-trigger">
          <span>DApp</span>
          <img
            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
            alt="User avatar"
          />
        </button>
        {/* &nbsp; */}
      </div>
      {/* Balance display */}
      <div className="balance">
        &nbsp;
        <h5>WALLET BALANCE </h5>
        <table className="balance_table">
          <thead>
            <td>
              <b>Logo</b>
            </td>
            <td>
              <b>Name</b>
            </td>
            <td>
              <b>Balance</b>
            </td>
          </thead>
          &nbsp;
          <tbody>
            <tr>
              <td>
                <img src={ethLogo} height="32" alt="" />
              </td>
              <td>ETH</td>
              <td>{window.web3.utils.fromWei(props.ethBalance, "Ether")}</td>
            </tr>
            &nbsp;
            <tr>
              <td>
                <img src={tokenLogo} height="32" alt="" />
              </td>
              <td>DApp</td>
              <td>{window.web3.utils.fromWei(props.tokenBalance, "Ether")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BuyForm;
