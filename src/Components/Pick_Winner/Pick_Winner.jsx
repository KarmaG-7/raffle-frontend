import React, { useState } from "react";
import "./Pick_Winner.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Pick_Winner = ({ chosenOne }) => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState({ secret_token: "" });

  const handleChange = (e) => {
    setErrorMessage("");
    setPassword({
      ...password,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await pickWinner();
    setPassword({ secret_token: "" });
  };

  const pickWinner = async () => {
    try {
      const url = import.meta.env.VITE_API_URL;
      setLoading(true);
      setErrorMessage("");
      const res = await axios.put(`${url}/raffles/${id}/winner`, password);
      chosenOne(res.data.data);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pick-winner">
      {loading && <p className="message">Loading....</p>}

      <form onSubmit={handleSubmit} className="winner-form">
        <h3>Pick a Winner</h3>
        <input
          className="winner-input"
          placeholder="Secret Token"
          type="text"
          onChange={handleChange}
          value={password.secret_token}
          id="secret_token"
          required
        />

        {errorMessage && <p className="message">{errorMessage}</p>}

        <button className="submit-button">Pick a Winner</button>
      </form>
    </div>
  );
};

export default Pick_Winner;
