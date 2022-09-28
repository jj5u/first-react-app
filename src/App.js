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
        setSelectedCoin(coin.find((coin) => coin.id === event.target.value));
    };
    // coin.find((coin) => coin.id === option)
    // find selected object
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
                setSelectedCoin(data[0]);
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
                <select onChange={onSelect} defaultValue="" value={coin.id}>
                    {coin.map((coin) => (
                        <option value={coin.id} key={coin.id}>
                            {coin.name}({coin.symbol})
                        </option>
                    ))}
                </select>

                <div>
                    coin to $
                    <input type="text" readOnly value={selectedCoin.} />
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
                            {coin.name}({coin.symbol}) :{" "}
                            {Intl.NumberFormat("en-Latn-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(coin.quotes.USD.price)}
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
