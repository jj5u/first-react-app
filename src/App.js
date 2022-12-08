import Button from "./Button";
import PropTypes, { symbol } from "prop-types";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [loading, completeLoading] = useState(false);
  const [coin, setCoin] = useState([]);
  const [option, setOption] = useState([]);
  const [btcPrice, setBtcPrice] = useState([]);
  const [amount, setAmount] = useState(0);
  const [converted, modifyConvert] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState({
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    circulating_supply: 19162606,
    total_supply: 19162606,
    max_supply: 21000000,
    beta_value: 0.969475,
    first_data_at: "2010-07-17T00:00:00Z",
    last_updated: "2022-09-28T05:21:50Z",
    quotes: {
      USD: {
        price: 18728.678358734407,
        volume_24h: 49759696012.69819,
        volume_24h_change_24h: 5.2,
        market_cap: 358890284289,
        market_cap_change_24h: -7.42,
        percent_change_15m: -0.15,
        percent_change_30m: -0.22,
        percent_change_1h: -0.32,
        percent_change_6h: -1.99,
        percent_change_12h: -1.55,
        percent_change_24h: -7.42,
        percent_change_7d: -1.28,
        percent_change_30d: -8.18,
        percent_change_1y: -55.6,
        ath_price: 68692.137036932,
        ath_date: "2021-11-10T16:51:15Z",
        percent_from_price_ath: -72.75,
      },
    },
  });

  const API_KEY = "https://api.coinpaprika.com/v1/tickers";
  useEffect(() => {
    fetch(API_KEY)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCoin(data);
        completeLoading(true);
        setSelectedCoin(data[0]);
        setBtcPrice(data[0]);
      });
  }, []);

  const reset = () => {
    setAmount(0);
    modifyConvert(false);
  };
  const onSelect = (event) => {
    setOption(event.target.value);
    setSelectedCoin(coin.find((coin) => coin.id === event.target.value));
    reset();
  };
  const onChange = (event) => {
    setAmount(event.target.value);
  };
  const onConvert = () => {
    modifyConvert(true);
  };
  const fullPrice = selectedCoin.quotes.USD.price;
  const price = fullPrice.toFixed(2);
  const pricePerDollar = 1 / price;

  return (
    <div>
      <h1>
        Coin Tracker (<span className={styles.title}>{coin.length}</span>)
      </h1>
      {loading ? null : <strong>Loading Now..</strong>}
      <div>
        <h3>Coin Converter</h3>
        <select onChange={onSelect} defaultValue="" value={coin.id}>
          {coin.map((coin) => (
            <option value={coin.id} key={coin.id}>
              {coin.name}({coin.symbol})
            </option>
          ))}
        </select>

        <div>
          {" "}
          price of {selectedCoin.name}: ${price}
        </div>
        <div>
          {/* coin to btc price: ${coin[0].quotes.USD.price} */}
          {/* <input type="text" readOnly value={coin.id["btc-bitcoin"]} /> */}
        </div>
        <div>
          $1 : {pricePerDollar} {selectedCoin.name}s
        </div>
        <div className={styles.converter}>
          <input type="text" onChange={onChange} value={amount === 0 ? "" : amount} /> <button onClick={onConvert}>convert to {selectedCoin.name}</button>
          <div className={styles.output}>
            {converted ? (amount * pricePerDollar).toFixed(2) : ""} {converted ? `${selectedCoin.name}s` : ""}
          </div>
          <button onClick={reset}>reset</button>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <th>coin name</th>
            <th>price</th>
          </thead>
          <tbody>
            {coin.map((coin) => (
              <tr className={styles.this} key={coin.id}>
                <td>
                  {coin.name}({coin.symbol})
                </td>
                <td>
                  {Intl.NumberFormat("en-Latn-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(coin.quotes.USD.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Button.PropTypes = {
  text: PropTypes.string.isRequired,
};
export default App;
