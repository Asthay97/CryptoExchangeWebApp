import React, { Component } from "react";
import { ethers } from "ethers";
import "../styles/History.css";
// import etherscan from "./etherscan.js";

const providers = new ethers.providers.EtherscanProvider(
  "ropsten",
  "Y2538JXAEWASRXPFIGPYRT35X6ACHVHFTP"
);
class History extends Component {
  async componentWillMount() {
    //   this.props.account !== ""
    // ? await this.historyDetails()
    // : await this.getData();
    await this.historyDetails();
    // await this.getData();
  }

  getData = () => {
    console.log("no address", this.props.account);
    console.log("history state:", this.state.history);
  };

  historyDetails = () => {
    this.setState({ id: "0x5757EA38D1e1B2Da8852F91b05dd6174DE21c228" });
    console.log("accounts:", this.props.account);
    providers
      .getBalance(`0x5757EA38D1e1B2Da8852F91b05dd6174DE21c228`)
      .then((balance) => {
        console.log("baalnce:", balance);
      });
    providers
      .getHistory("0x5757EA38D1e1B2Da8852F91b05dd6174DE21c228")
      .then((getHistory) => {
        console.log("history", getHistory);

        for (let i = 0; i < getHistory.length; i++) {
          this.setState({
            history: [...this.state.history, getHistory[i]],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // Balance- to get token list
    // ("EK-55Lfy-eDdefCs-N51dA");
    // ("https://kovan-api.ethplorer.io/");
  };

  constructor(props) {
    super(props);
    this.state = {
      history: [],
      id: "",
    };
  }

  render() {
    return (
      <div className="history">
        <h5>ACTIVITY</h5>
        {/* {this.props.account === "" ? (
          <div> Loading ... </div>
        ) : ( */}
        <table>
          <thead className="heading">
            <tr>
              <th scope="col">Data</th>
              <th scope="col">Value</th>
              <th scope="col">Gas</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody className="sent_receive">
            {this.state.history.map((data, key) => {
              // value
              let parseValue = parseInt(data.value);
              let value = ethers.utils.formatEther(parseValue.toString());

              //gas price
              let parseGasPrice = parseInt(data.gasPrice);
              let gasP = ethers.utils.formatEther(parseGasPrice.toString());
              let gasPrice = parseFloat(gasP).toFixed(10);
              return this.props.account === data.from ? (
                data.to === null ? (
                  <tr>
                    <td key={key}>Contract created</td>
                    <td>{value}</td>
                    <td>{gasPrice}</td>
                    <td>{data.hash}</td>
                  </tr>
                ) : (
                  <tr>
                    <td key={key}>Sent to</td>
                    <td>{value}</td>
                    <td>{gasPrice}</td>
                    <td>{data.to}</td>
                  </tr>
                )
              ) : (
                <tr>
                  <td key={key}>Received from</td>
                  <td>{value}</td>
                  <td>{gasPrice}</td>
                  <td>{data.from}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default History;
