import Button from "./Button";
import PropTypes from "prop-types";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function Hello() {
  useEffect(() => {
    console.log("created");
    return () => console.log("destroyed"); // a cleanup function
  }, []);
  return <h1>Hello</h1>;
}
function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      {showing ? <Hello /> : "Naa"}
      <button onClick={onClick}>{showing ? "show" : "hide"}</button>
    </div>
  );
}

Button.PropTypes = {
  text: PropTypes.string.isRequired,
};
export default App;
