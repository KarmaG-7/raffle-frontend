import React from "react";
import NavBar from "../NavBar/NavBar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SingleRaffle.css";

const SingleRaffle = () => {
  const { id } = useParams();
  const [newParticipant, setNewParticipant] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

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

  const handleSubmit = () => {};

  return (
    <div className="enterToRaffle">
      <NavBar id={id} />
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
            required
          />
        </div>
        <div className="add-reset">
          <button>Submit</button>
          <button onClick={resetForm}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default SingleRaffle;
