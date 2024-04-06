import React, { useEffect, useState } from "react";
import All_Raffles from "../All_Raffles/All_Raffles";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [newRaffle, setNewRaffle] = useState("");

  const [raffle, setRaffle] = useState({
    title: "",
    secret_token: "",
  });

  const handleChange = (e) => {
    setRaffle({
      ...raffle,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${url}/raffles`, raffle);
      const newRaffleData = response.data.data;
      setNewRaffle(newRaffleData);
      setRaffle({ title: "", secret_token: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <h1 className="title">Raffle App</h1>
      <h3> New Raffle </h3>
      <form className="create-raffle" onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="raffle" className="input-label">
            {" "}
            Raffle Name
          </label>
          <input
            placeholder="Title"
            className="create-raffle-input"
            type="text"
            onChange={handleChange}
            value={raffle.title}
            id="title"
            required
          />
        </div>

        <div className="input-block">
          <label htmlFor="raffle" className="input-label">
            {" "}
            Raffle Secret Token
          </label>
          <input
            className="create-raffle-input"
            placeholder="Secret Token"
            type="text"
            onChange={handleChange}
            value={raffle.secret_token}
            id="secret_token"
            required
          />
        </div>
        <p className="instruction">
          You must remember the Raffle Token because it will be asked when
          picking a winner
        </p>
        <button className="submit-button">Create New Raffle</button>
      </form>

      <All_Raffles newRaffle={newRaffle} />
    </div>
  );
};
export default Home;
