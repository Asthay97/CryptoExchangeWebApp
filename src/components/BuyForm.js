import React, { Component } from "react";
import "../styles/BuyForm.css";
import contractAddress from "../artifacts/contractAddresses.json";
import Token from "../abis/Token.json";
import EthSwap from "../abis/EthSwap.json";
import axios from "axios";
import EtherscanApi from "./EtherscanApi.js";

class BuyForm extends Component {
  async componentWillMount() {
    await this.loadBlockchainData();
    await this.LoadContractAddress();
    await this.loadTokenBalance();
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const ethBalance = await web3.eth.getBalance(this.state.account);
    this.setState({ ethBalance });

    // Load Dapp Token
    const networkId = await web3.eth.net.getId();
    const tokenData = Token.networks[networkId];
    if (tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address);
      this.setState({ token });
      let tokenBalance = await token.methods
        .balanceOf(this.state.account)
        .call();
      console.log("acc:", tokenData.address);
      this.setState({ tokenBalance: tokenBalance.toString() });
    } else {
      window.alert("Token contract not deployed to detected network.");
    }
    const ethSwapData = EthSwap.networks[networkId];
    if (ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address);
      console.log("token address:", ethSwap.address);
      this.setState({ ethSwap });
    } else {
      window.alert("EthSwap contract not deployed to detected network.");
    }

    this.setState({ loading: false });
  }
  async LoadContractAddress() {
    Object.keys(contractAddress).map((keyN) => {
      const dayTasks = contractAddress[keyN];
      return Object.keys(dayTasks).map(async (key) => {
        const task = dayTasks[key];
        this.setState({
          contractAddr: {
            contractA: [...this.state.contractAddr.contractA, task],
            tokenName: [...this.state.contractAddr.tokenName, keyN],
            balance: [...this.state.contractAddr.balance, ""],
          },
        });
      });
    });
  }

  async loadTokenBalance() {
    this.state.contractAddr.contractA.map(async (data, index) => {
      const tokenBalance = await EtherscanApi.get(
        `?module=account&action=tokenbalance&contractaddress=${data}&address=${this.state.account}&tag=latest&apikey=Y2538JXAEWASRXPFIGPYRT35X6ACHVHFTP`
      );

      let balance = [...this.state.contractAddr.balance];
      let item = { ...balance[index] };
      item = tokenBalance.data.result;
      balance[index] = item;
      this.setState({ contractAddr: { balance } });

      console.log(
        "token balance:",
        this.state.contractAddr.balance,
        tokenBalance
      );
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      token: {},
      ethSwap: {},
      ethBalance: "0",
      tokenBalance: "0",
      loading: true,
      iCoins: [
        "DApp",
        "Ether",
        "USDT",
        "USDC",
        "LINK",
        "BUSD",
        "UNI",
        "WBTC",
        "CRO",
        "FTXT",
        "DAI",
        "MANA",
        "GRT",
        "AAVE",
        "LRC",
        "QNT",
        "CHZ",
        "LEO",
        "MKR",
        "ENJ",
        "BTT",
        "AMP",
      ],
      contractAddr: {
        contractA: [],
        tokenName: [],
        balance: [],
      },
      iBalance: "",
      oBalance: "",
      outputVal: "0",
      inputVal: "",
      addICoin: "Ether",
      addOCoin: "DApp",
      dropdownIRef: null,
      dropdownORef: null,
      isOActive: false,
      isIActive: false,
    };
  }

  buyTokens = (etherAmount) => {
    this.setState({ loading: true });
    this.state.ethSwap.methods
      .buyTokens()
      .send({ value: etherAmount, from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
      });
  };

  sellTokens = (tokenAmount) => {
    this.setState({ loading: true });
    this.state.token.methods
      .approve(this.state.ethSwap.address, tokenAmount)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.state.ethSwap.methods
          .sellTokens(tokenAmount)
          .send({ from: this.state.account })
          .on("transactionHash", (hash) => {
            this.setState({ loading: false });
          });
      });
  };

  onClickInput = () => this.setState({ isIActive: !this.state.isIActive });
  onClickOutput = () => this.setState({ isOActive: !this.state.isOActive });

  handleInputClick = (coin) => {
    if (coin === "Ether") {
      this.setState({
        iBalance: window.web3.utils.fromWei(this.state.tokenBalance, "Ether"),
      });
    } else if (coin === "DApp") {
      this.setState({
        iBalance: window.web3.utils.fromWei(this.state.ethBalance, "Ether"),
      });
    } else {
      Object.keys(contractAddress).map((keyN, index) => {
        const dayTasks = contractAddress[keyN];
        return Object.keys(dayTasks).map(async (key) => {
          if (keyN === coin) {
            return this.setState({
              iBalance: this.state.contractAddr.balance[index],
            });
          }
        });
      });
    }
    this.setState({ addICoin: coin });
    this.setState({ isIActive: false });
  };

  handleOutputClick = (coin) => {
    if (coin === "Ether") {
      this.setState({
        oBalance: window.web3.utils.fromWei(this.state.tokenBalance, "Ether"),
      });
    } else if (coin === "DApp") {
      this.setState({
        oBalance: window.web3.utils.fromWei(this.state.ethBalance, "Ether"),
      });
    } else {
      Object.keys(contractAddress).map((keyN, index) => {
        const dayTasks = contractAddress[keyN];
        return Object.keys(dayTasks).map(async (key) => {
          if (keyN === coin) {
            return this.setState({
              oBalance: this.state.contractAddr.balance[index],
            });
          }
        });
      });
    }
    this.setState({ addOCoin: coin });
    this.setState({ isOActive: false });
  };

  render() {
    let content;
    if (this.state.loading) {
      content = (
        <p id="loader" className="text-center">
          Loading...
        </p>
      );
    }

    return (
      <div className="buy_app">
        <form
          className="buy_form"
          onSubmit={(event) => {
            event.preventDefault();
            console.log("event:", event.target.value);
            let etherAmount;
            etherAmount = this.state.input.value.toString();
            etherAmount = window.web3.utils.toWei(etherAmount, "Ether");
            this.buyTokens(etherAmount);
          }}
        >
          <div>
            <label className="buy_input">
              <b>Input</b>
            </label>
            <span className="input_balance">
              Balance: {this.state.iBalance}
            </span>
          </div>
          <div className="input-data">
            <input
              type="text"
              onChange={async (event) => {
                event.preventDefault();
                console.log("event.target:", event.target.value);
                this.setState({ inputVal: event.target.value });

                // const etherAmount = this.state.inputVal.toString();
                const etherAmount = event.target.value;
                let qs = `?symbol=${this.state.addOCoin}`;
                let res = await axios.get(
                  "https://cors-anywhere.herokuapp.com/pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest" +
                    qs,
                  {
                    headers: {
                      "X-CMC_PRO_API_KEY":
                        "77eeed41-5e19-4563-9b1d-f2cf779df513",
                    },
                  }
                );

                let etherPrice = await axios.get(
                  "https://cors-anywhere.herokuapp.com/pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ETH",
                  {
                    headers: {
                      "X-CMC_PRO_API_KEY":
                        "77eeed41-5e19-4563-9b1d-f2cf779df513",
                    },
                  }
                );
                let etherRate = etherPrice.data.data.ETH.quote.USD.price;
                let result = res.data.data[this.state.addOCoin].quote.USD.price;

                console.log(
                  "res:",
                  etherAmount,
                  etherRate,
                  result,
                  etherAmount * (etherRate / result)
                );

                this.setState({
                  outputVal: etherAmount * (etherRate / result),
                });
              }}
              // ref={
              //   (input) => {
              //     console.log("input");
              //   }
              //   // .then(() =>
              //   //   this.setState({ inputVal: input });
              //   // )
              // }
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
              Balance: {this.state.oBalance}
            </span>
          </div>
          <div className="output_placeholder">
            <input
              type="text"
              className="output_value_placeholder"
              placeholder="0"
              value={this.state.outputVal}
              disabled
            />
          </div>
          <button type="submit" className="submit_button">
            SWAP!
          </button>
        </form>

        {/* Buttons for input and output tokens */}
        <div className="input_menu">
          <button onClick={this.onClickInput} className="menu-trigger">
            <span>{this.state.addICoin}</span>
            <img
              src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
              alt="User avatar"
            />
          </button>
          <nav
            ref={this.state.dropdownIRef}
            className={`menu ${this.state.isIActive ? "active" : "inactive"}`}
          >
            <ul>
              {this.state.iCoins.map((el) => {
                return (
                  <li>
                    <a
                      onClick={() => this.handleInputClick(el)}
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
          <button onClick={this.onClickOutput} className="menu-trigger">
            <span>{this.state.addOCoin}</span>
            <img
              src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
              alt="User avatar"
            />
          </button>
          <nav
            ref={this.state.dropdownORef}
            className={`menu ${this.state.isOActive ? "active" : "inactive"}`}
          >
            <ul>
              {this.state.iCoins.map((el) => {
                return (
                  <li>
                    <a
                      onClick={() => this.handleOutputClick(el)}
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
          <h4>WALLET BALANCE </h4>
          <h6>Token Name Balance</h6>
          {Object.keys(contractAddress).map((keyN, index) => {
            if (this.state.contractAddr.balance[index] !== 0) {
              return (
                <div>
                  {keyN}
                  {this.state.contractAddr.balance[index]}
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}
export default BuyForm;
