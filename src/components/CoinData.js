import React from "react";
import "../styles/CoinData.css";

const CoinData = ({ data }) => {
  const renderData = () => {
    if (data) {
      return (
        <div className="coin_data">
          <table>
            <tr>
              <th>Volume 24H</th>
              <th>High(24h)</th>
              <th>Market Cap</th>
              <th>Total Supply</th>
              <th>Low(24h)</th>
              <th>Circulating Supply</th>
            </tr>
            <tbody>
              <tr>
                <td>{data.total_volume}</td>
                <td>{data.high_24h}</td>
                <td>{data.market_cap}</td>
                <td>{data.total_supply}</td>
                <td>{data.low_24h}</td>
                <td>{data.circulating_supply}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  };

  return <div>{renderData()}</div>;
};

export default CoinData;
