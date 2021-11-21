import React, { useState } from "react";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";
import "../styles/Main.css";

function Main(props) {
  const [state, setState] = useState({ currentForm: "buy" });
  let content;
  if (state.currentForm === "buy") {
    content = <BuyForm />;
  } else {
    content = <SellForm />;
  }

  return (
    <div className="main_content">
      <div className="main_buttons">
        &nbsp;
        <h5 className="heading_main">EXCHANGE TOKENS</h5>
        &nbsp;
        <button
          className="main_buy"
          onClick={(event) => {
            setState({ currentForm: "buy" });
          }}
        >
          Buy
        </button>
        <button
          className="main_sell"
          onClick={(event) => {
            setState({ currentForm: "sell" });
          }}
        >
          Sell
        </button>
      </div>

      <div className="main_card">
        <div className="main_card_body">{content}</div>
      </div>
    </div>
  );
}

export default Main;
