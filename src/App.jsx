import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import SingleRaffle from "./Components/SingleRaffle/SingleRaffle";
import RaffleParticipants from "./Components/RaffleParticipants/RaffleParticipants";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/raffles/:id" element={<SingleRaffle />}></Route>
          <Route
            path="/raffles/:id/participants"
            element={<RaffleParticipants />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
