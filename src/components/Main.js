import React, { Component, useEffect, useState } from 'react';
import BuyForm from './BuyForm'
import SellForm from './SellForm'

function Main(props) {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     currentForm: 'buy'
  //   }
  // }
  const [state,setState] = useState({currentForm: 'buy'});
  // useEffect(() => {
  //   // effect
  //   // return () => {
  //   //   cleanup
  //   // }
  //   this.state = {
  //     currentForm: 'buy'
  //   }
  // });
  // render() {
    let content
    if(state.currentForm === 'buy') {
      content = <BuyForm
        ethBalance={props.ethBalance}
        tokenBalance={props.tokenBalance}
        buyTokens={props.buyTokens}
      />
    } else {
      content = <SellForm
        ethBalance={props.ethBalance}
        tokenBalance={props.tokenBalance}
        sellTokens={props.sellTokens}
      />
    }

    return (
      <div id="content" className="mt-3">

        <div className="d-flex justify-content-between mb-3">
          <button
              className="btn btn-light"
              onClick={(event) => {
                setState({ currentForm: 'buy' })
              }}
            >
            Buy
          </button>
          <span className="text-muted">&lt; &nbsp; &gt;</span>
          <button
              className="btn btn-light"
              onClick={(event) => {
                setState({ currentForm: 'sell' })
              }}
            >
            Sell
          </button>
        </div>

        <div className="card mb-4" >

          <div className="card-body">

            {content}

          </div>

        </div>

      </div>
    );
  // }
}

export default Main;
