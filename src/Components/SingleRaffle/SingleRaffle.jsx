import React from "react";
import NavBar from "../NavBar/NavBar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SingleRaffle.css";
import axios from "axios";

const SingleRaffle = () => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [raffle, setRaffle] = useState({});
  const [newParticipant, setNewParticipant] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchRaffle();
  }, []);

  const handleChange = (e) => {
    setNewParticipant({
      ...newParticipant,
      [e.target.id]: e.target.value,
    });
  };

  const resetForm = () => {
    setNewParticipant({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    });
  };

  const fetchRaffle = async () => {
    try {
      const url = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${url}/raffles/${id}`);
      setLoading(true);
      setRaffle(res.data.data);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const addParticipantToRaffle = async () => {
    try {
      const url = import.meta.env.VITE_API_URL;
      await axios.post(`${url}/raffles/${id}/participants`, newParticipant);
      setLoading(true);
      alert("The participant has been added");
    } catch (error) {
      setErrorMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  const renderContent = () => {
    if (loading) {
      return <p className="message">Loading.....</p>;
    } else if (errorMessage) {
      return <p className="message">Error: {errorMessage}</p>;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addParticipantToRaffle();
    resetForm();
  };

  return (
    <>
      <NavBar id={id} />
      {raffle.winner_id === null ? (
        ""
      ) : (
        <p className="winner-picked">
          **The winner for this raffle has been picked already. You can't add
          any more participants. Please click "pick winner" to see more
          information.**
        </p>
      )}

      {renderContent()}

      <div className="enterToRaffle">
        <h3>{raffle.title}</h3>
        <form onSubmit={handleSubmit} className="add-participant-form">
          <div className="input-block">
            <label htmlFor="raffle" className="input-label">
              {" "}
              First Name
            </label>
            <input
              placeholder="First Name"
              className="create-raffle-input"
              type="text"
              onChange={handleChange}
              value={newParticipant.first_name}
              id="first_name"
              required
            />
          </div>
          <div className="input-block">
            <label htmlFor="raffle" className="input-label">
              {" "}
              Last Name
            </label>
            <input
              placeholder="Last Name"
              className="create-raffle-input"
              type="text"
              onChange={handleChange}
              value={newParticipant.last_name}
              id="last_name"
              required
            />
          </div>
          <div className="input-block">
            <label htmlFor="raffle" className="input-label">
              {" "}
              Email
            </label>
            <input
              placeholder="johnDoe@gmail.com"
              className="create-raffle-input"
              type="text"
              onChange={handleChange}
              value={newParticipant.email}
              id="email"
              required
            />
          </div>
          <div className="input-block">
            <label htmlFor="raffle" className="input-label">
              {" "}
              Phone
            </label>
            <input
              placeholder="917-233-0000"
              className="create-raffle-input"
              type="text"
              onChange={handleChange}
              value={newParticipant.phone}
              id="phone"
            />
          </div>
          <div className="add-reset">
            <button disabled={raffle.winner_id !== null}>Submit</button>
            <button onClick={resetForm}>Reset</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SingleRaffle;
