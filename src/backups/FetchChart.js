// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import HistoryChart from "./HistoryChart.js";
// import CoinData from "./CoinData.js";
// import coinGecko from "./coinGecko";
// import "../styles/FetchChart.css";
// const axios = require("axios");

// const FetchChart = (props) => {
//   // useEffect(() => {
//   //   await this.getData();
//   // }, []);

//   // const { id } = useParams();
//   const id = "bitcoin";
//   const [coinData, setCoinData] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [ccData, setCcData] = useState([]);

//   const formatData = (data) => {
//     return data.map((el) => {
//       return {
//         t: el[0],
//         y: el[1].toFixed(2),
//       };
//     });
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);

//       const [day, week, year, detail] = await Promise.all([
//         coinGecko.get(`/coins/${props.id}/market_chart/`, {
//           params: {
//             vs_currency: "inr",
//             days: "1",
//           },
//         }),
//         coinGecko.get(`/coins/${props.id}/market_chart/`, {
//           params: {
//             vs_currency: "inr",
//             days: "7",
//           },
//         }),
//         coinGecko.get(`/coins/${props.id}/market_chart/`, {
//           params: {
//             vs_currency: "inr",
//             days: "365",
//           },
//         }),
//         coinGecko.get("/coins/markets/", {
//           params: {
//             vs_currency: "inr",
//             ids: props.id,
//           },
//         }),
//       ]);
//       console.log(day);

//       setCoinData({
//         day: formatData(day.data.prices),
//         week: formatData(week.data.prices),
//         year: formatData(year.data.prices),
//         detail: detail.data[0],
//       });
//       await getData();
//       setIsLoading(false);
//     };

//     fetchData();
//   }, []);

//   const getData = () => {
//     axios({
//       url: "https://coinpaprika1.p.rapidapi.com/tickers",
//       headers: {
//         "content-type": "application/octet-stream",
//         "x-rapidapi-host": "coinpaprika1.p.rapidapi.com",
//         "x-rapidapi-key": "2823743431msha7cb218cdebfa90p1e93b5jsn12f99e7c2c3c",
//         useQueryString: true,
//       },
//     })
//       .then((response) => {
//         const coins = response.data;

//         for (let j = 0; j < 10; j++) {
//           setCcData([...ccData, coins[j]]);
//         }
//         console.log("coin data", ccData);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const renderData = () => {
//     if (isLoading) {
//       return <div>Loading....</div>;
//     }
//     return (
//       <div className="coinlist">
//         <div className="crypto_tracker">
//           <h5>CRYPTO PRICE TRACKER</h5>
//           {/* <table className="table_tracker">
//             <thead className="thead"> */}
//           <h2>Rank Logo Name Price(USD) Market Cap(USD)</h2>
//           {/* </thead>
//             <tbody> */}
//           {ccData.map((data, key) => {
//             console.log("ccData:", ccData);
//             return (
//               // <tr key={key}>
//               <div>
//                 {data.rank}
//                 {data.symbol}

//                 {/* <a
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       href={"https://coinpaprika.com/coin/" + data.id}
//                     > */}
//                 {/* <Link to="<FetchChart id=bitcoin/>" > */}

//                 {/* <a href="#example"> */}
//                 {data.name}
//                 {/* </a> */}
//                 {/* </Link> */}
//                 {/* </a> */}

//                 {data.quotes.USD.price.toFixed(2)}

//                 {data.quotes.USD.market_cap.toLocaleString("fr-CH")}
//               </div>
//               // </tr>
//             );
//           })}
//           {/* </tbody>
//           </table> */}

//           {/* <div id="example">
//           <FetchChart id="Bitcoin" />
//         </div> */}
//         </div>
//         <HistoryChart data={coinData} />
//         <CoinData data={coinData.detail} />
//       </div>
//     );
//   };

//   return renderData();
// };

// export default FetchChart;
