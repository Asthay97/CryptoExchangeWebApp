import React, { useRef, useState, useLayoutEffect } from "react";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import "../styles/BuyForm.css";

import Web3 from "web3";
import tokenLogo from "../token-logo.png";
import ethLogo from "../eth-logo.png";
import { ethers } from "ethers";
import contractAddress from "../artifacts/contractAddresses.json";
import Token from "../abis/Token.json";

export default function BuyForm(props) {
  useLayoutEffect(() => {
    console.log("props", a);
    console.log("coins:", props.iCoin);
    // console.log('I am about to render!');
  }, []);
  const [iCoins, setICoins] = useState([]);
  const [acc, setAcc] = useState(props.tokenBalance);
  const [a, setA] = useState(props.contractAddr);
  const [state, setState] = useState({
    output: "0",
  });
  const [input, setInput] = useState(undefined);
  const dropdownORef = useRef(null);
  const dropdownIRef = useRef(null);
  const [isIActive, setIsIActive] = useDetectOutsideClick(dropdownIRef, false);
  const [isOActive, setIsOActive] = useDetectOutsideClick(dropdownORef, false);
  // const [iCoins, setICoins] = useState([
  //   "Tether",
  //   "USD Coin",
  //   "Chainlink",
  //   "Binance USD",
  //   "Uniswap",
  //   "Wrapped Bitcoin",
  //   "Crypto.com Coin",
  //   "FTX Token",
  //   "Dai",
  //   "Decentraland",
  //   "The Graph",
  //   "Aave",
  //   "Loopring",
  //   "Quant",
  //   "Chiliz",
  //   "UNUS SED LEO",
  //   "Maker",
  //   "Enjin Coin",
  //   "BitTorrent",
  //   "Amp",
  //   "DApp",
  //   "Ether",
  // ]);

  const [addICoin, setAddICoin] = useState("Ether");
  const [addOCoin, setAddOCoin] = useState("DApp");

  const onClickInput = () => setIsIActive(!isIActive);
  const onClickOutput = () => setIsOActive(!isOActive);

  const handleInputClick = (coin) => {
    setAddICoin(coin);
    setIsIActive(false);
  };

  const handleOutputClick = (coin) => {
    setAddOCoin(coin);
    setIsOActive(false);
  };

  return (
    <div className="buy_app">
      <form
        className="buy_form"
        // onSubmit={(event) => {
        //   event.preventDefault();
        //   let etherAmount;
        //   etherAmount = input.value.toString();
        //   etherAmount = window.web3.utils.toWei(etherAmount, "Ether");
        //   props.sellTokens(etherAmount);
        // }}
      >
        <div>
          <label className="buy_input">
            <b>Input</b>
          </label>
          <span className="input_balance">
            Balance: {window.web3.utils.fromWei(props.tokenBalance, "Ether")}
          </span>
        </div>
        <div className="input-data">
          <input
            type="text"
            onChange={(event) => {
              //   const etherAmount = input.value.toString();
              //   setState({
              //     output: etherAmount * 100,
              //   });
              // }}
              // ref={(input) => {
              //   setInput(input);
            }}
            className="input_value_placeholder"
            placeholder="0"
            // required
          />
        </div>
        <div>
          <label className="output">
            <b>Output</b>
          </label>
          <span className="output_balance">
            Balance: {window.web3.utils.fromWei(props.ethBalance, "Ether")}
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
        </div>
        <button type="submit" className="submit_button">
          SWAP!
        </button>
      </form>
      <div className="input_menu">
        <button onClick={onClickInput} className="menu-trigger">
          <span>{addICoin}</span>
          <img
            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
            alt="User avatar"
          />
        </button>
        <nav
          ref={dropdownIRef}
          className={`menu ${isIActive ? "active" : "inactive"}`}
        >
          <ul>
            {iCoins.map((el) => {
              return (
                <li>
                  <a
                    onClick={() => handleInputClick(el)}
                    href="#"
                    className="dropdown-input-item"
                  >
                    {el}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="output_menu">
        <button onClick={onClickOutput} className="menu-trigger">
          <span>{addOCoin}</span>
          <img
            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
            alt="User avatar"
          />
        </button>
        <nav
          ref={dropdownORef}
          className={`menu ${isOActive ? "active" : "inactive"}`}
        >
          <ul>
            {iCoins.map((el) => {
              return (
                <li>
                  <a
                    onClick={() => handleOutputClick(el)}
                    href="#"
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

      {/* Balance display */}
      <div className="balance">
        <h4>WALLET BALANCE {acc} </h4>
        {/* <div>
          {acc.map(async (data, index) => {
            // console.log("balance data: ",data);
            return <p>index</p>;
          })}
        </div> */}
        <table className="balance_table">
          <thead>
            {/* <td>Logo</td> */}
            <td>Name</td>
            <td>Balance</td>
          </thead>
          <tbody>
            <tr>
              {/* <td>
                <img src={ethLogo} height="32" alt="" />
              </td> */}
              <td>ETH</td>
              {/*  <td>
                {window.web3.utils.fromWei(this.props.EthBalance, "Ether")}
              </td>
            */}
            </tr>
            <tr>
              {/* <td>
                <img src={tokenLogo} height="32" alt="" />
              </td> */}
              <td>DApp</td>
              {/* <td>{window.web3.utils.fromWei(props.TokenBalance, "Ether")}</td> */}
            </tr>
            {/* {props.Account} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
