import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import SingleRaffle from "./Components/SingleRaffle/SingleRaffle";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/raffles/:id" element={<SingleRaffle />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
