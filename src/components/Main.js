import React, { useState } from "react";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

function Main(props) {
  const [state, setState] = useState({ currentForm: "buy" });
  let content;
  if (state.currentForm === "buy") {
    content = (
      <BuyForm
      // ethBalance={props.ethBalance}
      // tokenBalance={props.tokenBalance}
      // buyTokens={props.buyTokens}
      // contractAddr={props.contractAddr}
      // account={props.account}
      // iCoins={props.iCoin}
      />
    );
  } else {
    content = (
      <SellForm
      // ethBalance={props.ethBalance}
      // tokenBalance={props.tokenBalance}
      // sellTokens={props.sellTokens}
      // contractAddr={props.contractAddr}
      // account={props.account}
      // iCoins={props.iCoin}
      />
    );
  }

  return (
    <div id="content" className="main_content">
      <div className="main_buttons">
        <span className="title_main">EXCHANGE ETH CRYPTOS</span>
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
