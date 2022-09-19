import Button from "./Button";
import PropTypes from "prop-types";
import styles from "./App.module.css";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className={styles.title}>Hello World!</p>
        Learn React
        <Button text={"Push"} />
      </header>
    </div>
  );
}

Button.PropTypes = {
  text: PropTypes.string.isRequired,
};
export default App;
