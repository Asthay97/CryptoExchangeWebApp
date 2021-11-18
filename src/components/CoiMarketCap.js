import axios from "axios";

export default axios.create({
  baseURL: "https://pro-api.coinmarketcap.com",
});
