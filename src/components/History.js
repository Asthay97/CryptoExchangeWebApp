import React, { Component, useState, useEffect } from "react";
import { ethers } from "ethers";
import "../styles/History.css";

const providers = new ethers.providers.EtherscanProvider(
  "ropsten",
  "Y2538JXAEWASRXPFIGPYRT35X6ACHVHFTP"
);

function History(props) {
  const [id, setId] = useState(props.account);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setId(props.account);
    if (props.account !== "") {
      const getHistory = async () => {
        await historyDetails();
      };
      getHistory();
    }
  }, [props.account]);

  const historyDetails = () => {
    providers.getBalance(props.account).then((balance) => {
      console.log("balance:", balance);
    });
    providers
      .getHistory(props.account)
      .then((getHistory) => {
        for (let i = 0; i < getHistory.length; i++) {
          setHistory((history) => [...history, getHistory[i]]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="history">
      <h5>ACTIVITY</h5>
      {props.account === "" ? (
        <div> Loading ... </div>
      ) : (
        <div className="sent_receive">
          {history === [] ? (
            <div>Loading ...</div>
          ) : (
            <table>
              <thead className="heading">
                <tr>
                  <th scope="col">Data</th>
                  <th scope="col">Value</th>
                  <th scope="col">Gas(GWei)</th>
                </tr>
              </thead>
              <tbody>
                &nbsp;
                {history.map((data, key) => {
                  // value
                  let parseValue = parseInt(data.value);
                  let value = ethers.utils.formatEther(parseValue.toString());

                  //gas price
                  let parseGasPrice = parseInt(data.gasPrice);
                  let gasP = ethers.utils.formatEther(parseGasPrice.toString());
                  let gasPrice = parseFloat(gasP).toFixed(10);
                  return props.account === data.from ? (
                    data.to === null ? (
                      <React.Fragment>
                        <tr>
                          <td key={key}>Contract </td>
                          <td>{value}</td>
                          <td>{gasPrice}</td>
                        </tr>
                        <tr>
                          <td>created</td>
                          <td> Address: </td>
                          <td>{data.hash}</td>
                        </tr>
                        &nbsp;
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <tr>
                          <td key={key}>Sent </td>
                          <td>{value}</td>
                          <td>{gasPrice}</td>
                        </tr>
                        <tr>
                          <td>to</td>
                          <td> Address: </td>
                          <td>{data.to}</td>
                        </tr>
                        &nbsp;
                      </React.Fragment>
                    )
                  ) : (
                    <React.Fragment>
                      <tr>
                        <td key={key}>Received </td>
                        <td>{value}</td>
                        <td>{gasPrice}</td>
                      </tr>
                      <tr>
                        <td>from</td>
                        <td> Address: </td>
                        <td>{data.from}</td>
                      </tr>
                      &nbsp;
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default History;
