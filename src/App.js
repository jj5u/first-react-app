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
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [del, removeTodos] = useState([]);
  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (todo === "") {
      return;
    }
    setTodo("");
    setTodos((currentArray) => [todo, ...currentArray]);
  };
  const remove = (event) => {
    setTodos([]);
  };
  console.log(todos);
  return (
    <div>
      <h1>To Do List({todos.length})</h1>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={todo} type="text" placeholder="write your todo" />
        <button>Enter</button>
      </form>
      <hr />
      <ul>
        {todos.map((item, index) => (
          <li key={index}>
            <input type="checkbox" /> {item}
          </li>
        ))}
      </ul>
      <button onClick={remove}>clear</button>
    </div>
  );
}

Button.PropTypes = {
  text: PropTypes.string.isRequired,
};
export default App;
