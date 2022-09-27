import Button from "./Button";
import PropTypes, { symbol } from "prop-types";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import { toContainElement } from "@testing-library/jest-dom/dist/matchers";

function App() {
  const [loading, completeLoading] = useState(false);
  const [coin, setCoin] = useState([]);
  const [option, setOption] = useState([]);
  //option = option value (id)
  const onSelect = (event) => {
    setOption(event.target.value);
  };
  // coin.find((coin) => coin.id === option)
  // find selected object
  const selectedCoin = coin.find((coin) => coin.id === option);
  const defaultCoin = coin.find((coin) => coin.id === "btc-bitcoin");
  console.log(typeof defaultCoin);

  // console.log(selectedCoin);

  const API_KEY = "https://api.coinpaprika.com/v1/tickers";
  useEffect(() => {
    fetch(API_KEY)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCoin(data);
        completeLoading(true);
        console.log(data);
      });
  }, []);
  useEffect(() => {
    // for (const [key, value] of Object.entries(selectedCoin)) {
    //   console.log(`${key}: ${value}`);
    // }
    console.log(typeof selectedCoin);
  }, [option]);

  return (
    <div>
      <h1>Coin Tracker ({coin.length})</h1>
      {loading ? null : <strong>Loading Now..</strong>}
      <div>
        <h3>Coin Converter</h3>
        <select onChange={onSelect} defaultValue={defaultCoin} value={coin.id}>
          {coin.map((coin) => (
            <option value={coin.id} key={coin.id}>
              {coin.name}({coin.symbol})
            </option>
          ))}
        </select>

        <div>
          coin to $
          <input type="text" readOnly value={option} />
        </div>
        <div>
          coin to btc
          <input type="text" readOnly value={selectedCoin} />
        </div>
        <div>
          1$ to coin
          <input type="text" readOnly value="hi" />
          {JSON.stringify(selectedCoin)}
        </div>
      </div>
      <div>
        <ul>
          {coin.map((coin) => (
            <li className={styles.this} key={coin.id}>
              {coin.name}({coin.symbol}) : {Intl.NumberFormat("en-Latn-US", { style: "currency", currency: "USD" }).format(coin.quotes.USD.price)}
            </li>
          ))}
        </ul>
        <input type="text" placeholder="put dollars" />
        <select>
          <option></option>
        </select>
        <button>convert</button>
      </div>
      <div>
        <ul></ul>
      </div>
    </div>
  );
}

Button.PropTypes = {
  text: PropTypes.string.isRequired,
};
export default App;
