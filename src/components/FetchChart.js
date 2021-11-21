import React, { Component } from "react";
import HistoryChart from "./HistoryChart.js";
import CoinData from "./CoinData.js";
import coinGecko from "./coinGecko";
import "../styles/FetchChart.css";
import id_symbol from "../artifacts/id_symbol.json";
const axios = require("axios");
const rp = require("request-promise");

class FetchChart extends Component {
  async componentWillMount() {
    await this.fetchData("chainlink");
    await this.getData();
  }

  formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      };
    });
  };

  fetchData = async (data) => {
    let id = "chainlink";
    Object.keys(id_symbol).map((keyN) => {
      const dayTasks = id_symbol[keyN];
      if (data === keyN) {
        return Object.keys(dayTasks).map(async (key) => {
          id = dayTasks[key];
        });
      }
    });

    this.setState({ isLoading: true });
    const [day, week, year, detail] = await Promise.all([
      coinGecko.get(`/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "1",
        },
      }),
      coinGecko.get(`/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "7",
        },
      }),
      coinGecko.get(`/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "365",
        },
      }),
      coinGecko.get("/coins/markets/", {
        params: {
          vs_currency: "usd",
          ids: id,
        },
      }),
    ]);

    this.setState({
      coinData: {
        day: this.formatData(day.data.prices),
        week: this.formatData(week.data.prices),
        year: this.formatData(year.data.prices),
        detail: detail.data[0],
      },
    });

    this.setState({ isLoading: false });
  };

  getData = async () => {
    let response = await axios.request({
      url:
        "https://cors-anywhere.herokuapp.com/pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      params: {
        start: "1",
        limit: "25",
        convert: "USD",
        cryptocurrency_type: "tokens",
      },
      headers: {
        "X-CMC_PRO_API_KEY": "77eeed41-5e19-4563-9b1d-f2cf779df513",
      },
      json: true,
    });
    const coins = response.data.data;
    for (let j = 0; j < 10; j++) {
      this.setState({
        ccData: [...this.state.ccData, coins[j]],
      });
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      ccData: [],
      loading: true,
      id: "bitcoin",
      coinData: {},
      isLoading: false,
    };
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading....</div>;
    }
    return (
      <div className="coinlist">
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
                <th scope="col">Market Cap Dominance(USD)</th>
                <th scope="col">Volume(24h)</th>
              </tr>
            </thead>
            <tbody>
              {this.state.ccData.map((data, key) => {
                return (
                  <tr key={key}>
                    <td>{data.cmc_rank}</td>
                    <td>{data.symbol}</td>
                    <td>
                      <button
                        className="cryptoDetail"
                        onClick={() => this.fetchData(data.name)}
                      >
                        {data.name}
                      </button>
                    </td>
                    <td>{data.quote.USD.price.toFixed(2)}</td>
                    <td>{data.quote.USD.market_cap.toLocaleString("fr-CH")}</td>
                    <td>{data.quote.USD.market_cap_dominance}</td>
                    <td>{data.quote.USD.volume_24h}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <HistoryChart data={this.state.coinData} />
        {/* {this.state.coinData.detail} */}
        <CoinData data={this.state.coinData.detail} />
      </div>
    );
  }
}

export default FetchChart;
