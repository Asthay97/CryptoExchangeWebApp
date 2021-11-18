import React, { Component } from "react";
import Web3 from "web3";
import Navbar from "./Navbar";
import "../styles/App.css";
import FetchChart from "./FetchChart.js";
import History from "./History.js";
import Main from "./Main";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    console.log("web3", window.web3);
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
    };
  }

  render() {
    let content;
    if (this.state.loading) {
      content = (
        <p id="loader" className="text-center">
          Loading...
        </p>
      );
    } else {
      content = (
        <Main
          ethBalance={this.state.ethBalance}
          tokenBalance={this.state.tokenBalance}
          buyTokens={this.buyTokens}
          sellTokens={this.sellTokens}
        />
      );
    }

    return (
      <div className="app">
        {/* Navbar div */}
        <Navbar account={this.state.account} />

        <div className="app_2">
          {/* Trade history div */}
          <div className="app_history">
            <History account={this.state.account} />
          </div>

          {/* Chart div */}
          <div className="app_chart">
            <FetchChart id="bitcoin" />
          </div>

          {/* Sell buy div */}
          <div className="app_swap">
            <div className="row">
              <main
                role="main"
                className="app_swap_2"
                style={{ maxWidth: "600px" }}
              >
                <div className="content">{content}</div>
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
