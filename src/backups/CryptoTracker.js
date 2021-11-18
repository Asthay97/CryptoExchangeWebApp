import React, { Component } from "react";
import "../styles/CryptoTracker.css";
const axios = require("axios");
// import { BrowserRouter, Route, Switch, Link, Navlink } from "react-router-dom";

class CryptoTracker extends Component {
  async componentWillMount() {
    await this.getData();
  }

  getData = () => {
    axios({
      url: "https://coinpaprika1.p.rapidapi.com/tickers",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coinpaprika1.p.rapidapi.com",
        "x-rapidapi-key": "2823743431msha7cb218cdebfa90p1e93b5jsn12f99e7c2c3c",
        useQueryString: true,
      },
    })
      .then((response) => {
        const coins = response.data;
        console.log("coin data", coins);
        for (let j = 0; j < 10; j++) {
          this.setState({
            ccData: [...this.state.ccData, coins[j]],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      ccData: [],
      loading: true,
    };
  }

  render() {
    return (
      <div className="crypto_tracker">
        <h5>CRYPTO PRICE TRACKER</h5>
        <table className="table_tracker">
          <thead className="thead">
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Logo</th>
              <th scope="col">Name</th>
              <th scope="col">Price(USD)</th>
              <th scope="col">Market Cap(USD)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.ccData.map((data, key) => {
              return (
                <tr key={key}>
                  <td>{data.rank}</td>
                  <td>{data.symbol}</td>
                  <td>
                    {/* <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={"https://coinpaprika.com/coin/" + data.id}
                    > */}
                    {/* <Link to="<FetchChart id=bitcoin/>" > */}

                    {/* <a href="#example"> */}
                    {data.name}
                    {/* </a> */}
                    {/* </Link> */}
                    {/* </a> */}
                  </td>
                  <td>{data.quotes.USD.price.toFixed(2)}</td>
                  <td>{data.quotes.USD.market_cap.toLocaleString("fr-CH")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* <div id="example">
          <FetchChart id="Bitcoin" />
        </div> */}
      </div>
    );
  }
}

export default CryptoTracker;
