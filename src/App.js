import Button from "./Button";
import PropTypes from "prop-types";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => {
    setValue((prev) => prev + 1);
  };
  const onChange = (event) => {
    setKeyword(event.target.value);
  };
  console.log("render");
  useEffect(() => {
    console.log("Am I calling API....?");
  }, []);
  useEffect(() => {
    if (keyword !== 0 && keyword.length > 5) {
      console.log(`search for ${keyword}`);
    }
  }, [keyword]);
  useEffect(() => {
    console.log("I am running when counter changes");
  }, [counter]);
  return (
    <div>
      <input value={keyword} onChange={onChange} type="text" placeholder="search bar" />
      <h1>Counter: {counter}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

Button.PropTypes = {
  text: PropTypes.string.isRequired,
};
export default App;
