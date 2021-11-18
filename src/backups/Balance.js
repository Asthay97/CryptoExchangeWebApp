import React, { useState, useEffect, useRef, Component } from "react";
import "../styles/Balance.css";
import Web3 from "web3";
import tokenLogo from "../token-logo.png";
import ethLogo from "../eth-logo.png";
import { ethers } from "ethers";
import contractAddress from "../artifacts/contractAddresses.json";
import Token from "../abis/Token.json";

const axios = require("axios");

const providers = new ethers.providers.EtherscanProvider(
  "ropsten",
  "Y2538JXAEWASRXPFIGPYRT35X6ACHVHFTP"
);

class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: [],
      contractAddr: [],
      balan: [],
      iCoin: [
        "Tether",
        "USD Coin",
        "Chainlink",
        "Binance USD",
        "Uniswap",
        "Wrapped Bitcoin",
        "Crypto.com Coin",
        "FTX Token",
        "Dai",
        "Decentraland",
        "The Graph",
        "Aave",
        "Loopring",
        "Quant",
        "Chiliz",
        "UNUS SED LEO",
        "Maker",
        "Enjin Coin",
        "BitTorrent",
        "Amp",
        "DApp",
        "Ether",
      ],
    };
  }
  // const [tokens, setTokens] = useState([]);
  // const [contractAddr, setContractAddr] = useState([]);
  // const [balan, setBalan] = useState(undefined);

  // const [iCoin, setICoin] = useState([
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
  // const isInitialMount = useRef(true);
  async componentWillMount() {
    // if (isInitialMount.current) {
    //   isInitialMount.current = false;
    // } else {
    //   // Your useEffect code here to be run on update

    // async function f3() {
    await this.f2();
    await this.bal();
    // }
    // return f3();
    // }
  }

  async f2() {
    Object.keys(contractAddress).map((keyN) => {
      const dayTasks = contractAddress[keyN];
      return Object.keys(dayTasks).map(async (key) => {
        const task = dayTasks[key];
        console.log("token data : ", task, keyN);
        this.setState({
          tokens: [...this.state.tokens, keyN],
          contractAddr: [
            ...this.state.contractAddr,
            // token: keyN,
            task,
            // bal:""
          ],
        });
      });
    });
  }

  async bal() {
    // const web3 = await window.web3;
    // if (window.ethereum) {
    //   window.web3 = new Web3(window.ethereum);
    //   await window.ethereum.enable();
    //   console.log("balances, contract address:", this.state.contractAddr);
    //   console.log("props:", this.props);
    //   // await f2();
    //   // console.log("contract address element:", key, el, val);
    //   const token = await new window.web3.eth.Contract(
    //     Token.abi,
    //     this.state.contractAddr[0]
    //   );
    //   let tokenBalance = token.methods.balanceOf(this.props.Account).call();
    //   this.setState({
    //     balan: {
    //       token: this.state.contractAddr.token,
    //       balance: tokenBalance,
    //     },
    //   });
    // }
    // console.log("token balance:", tokenBalance.toString());
  }
  // useEffect(() => {
  //   const bal = () => {
  //     console.log("balances, contract address:", props);
  //     {
  //       Object.keys(contractAddress).map((keyN) => {
  //         const dayTasks = contractAddress[keyN];
  //         return Object.keys(dayTasks).map((key) => {
  //           const task = dayTasks[key];
  //           return console.log("task:", keyN, task);
  //         });
  //       });
  //     }
  //     // console.log("contract address element:", key, el, val);
  //   };

  //   bal();
  // }, []);

  //     const ethBalance = window.web3.utils.toWei(props.EthBalance, "Ether");
  //     return ethBalance;
  //   };
  // const PRIVATE_KEY =
  //   "4d150c6e84831746dff4c413d18eba85ae7bcefb0915874bedbc46750972fafe"; // Eg. 0x40ddbce3c7df9ab8d507d6b4af3861d224711b35299470ab7a217f780fe696cd
  // const USER_WALLET = new ethers.Wallet(PRIVATE_KEY, providers);
  // console.log("user wallet:", USER_WALLET);
  // console.log("providers", providers);

  // axios({
  //   // method: "get",
  //   url:
  //     "https://web3api.io/api/v1/tokens/0x5757EA38D1e1B2Da8852F91b05dd6174DE21c228/holders/historical?timeFrame=30d",
  //   headers: {
  //     "x-api-key": "2823743431msha7cb218cdebfa90p1e93b5jsn12f99e7c2c3c",
  //   },
  // }).then((res) => {
  //   console.log("res:", res);
  //   // res data example:
  //   // {
  //   //   "metadata": {
  //   //     "columns": ["timestamp", "timestamp.holder*"]
  //   //   },
  //   //   "data": [{
  //   //     "timestamp": 1551571200000,
  //   //     "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be": 5.124709176050061e+27
  //   //   },
  //   //   ...
  //   //   ]
  //   // }
  // });
  // fetch("https://etherscan.io/tokens").then((resp) => {
  //   console.log("tokens:", resp);
  // });

  // });
  // let balancePromise = USER_WALLET.getBalance();

  // balancePromise.then((balance) => {
  //   console.log(balance);
  // });
  render() {
    return (
      <div className="balance">
        <h4>WALLET BALANCE</h4>
        <table className="balance_table">
          <thead>
            <td>Logo</td>
            <td>Name</td>
            <td>Balance</td>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={ethLogo} height="32" alt="" />
              </td>
              <td>ETH</td>
              <td>
                {window.web3.utils.fromWei(this.props.EthBalance, "Ether")}
              </td>
            </tr>
            <td>
              <img src={tokenLogo} height="32" alt="" />
            </td>
            <td>DApp</td>
            <td>
              {window.web3.utils.fromWei(this.props.TokenBalance, "Ether")}
            </td>
            {/* {props.Account} */}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Balance;
