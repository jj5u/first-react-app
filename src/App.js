import React from "react";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
        <Route path={`${process.env.PUBLIC_URL}/movie/:movieId`} element={<Detail />} />
      </Routes>
    </Router>
  );
}
export default App;
