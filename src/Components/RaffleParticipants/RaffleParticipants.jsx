import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RaffleParticipants.css";

const raffleParticipants = () => {
  const { id } = useParams();
  const url = import.meta.env.VITE_API_URL;

  const [allParticipants, setAllParticipants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAllParticipants();
    }
  }, []);

  const fetchAllParticipants = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const res = await axios.get(`${url}/raffles/${id}/participants`);
      setAllParticipants(res.data.data);
    } catch (error) {
      setErrorMessage(error.message);
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

  return (
    <>
      {" "}
      <NavBar id={id} />
      <div className="all-participants">
        {renderContent()}

        {!loading && allParticipants.length === 0 && (
          <p className="no_Participant">
            **There are no participants yet for this raffle**
          </p>
        )}
        <p className="total">Total Participants: {allParticipants.length}</p>
        <div className="participants">
          {allParticipants.map((item) => {
            const { first_name, last_name, email, phone } = item;
            const fullName = `${
              first_name.charAt(0).toUpperCase() + first_name.slice(1)
            } ${last_name.charAt(0).toUpperCase() + last_name.slice(1)}`;
            return (
              <div className="eachPerson" key={item.id}>
                <p>
                  Name: <strong>{fullName}</strong>
                </p>
                <p>Email: {email}</p>
                <p>Phone: {phone === "" ? "N/A" : phone}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default raffleParticipants;
