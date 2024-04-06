import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./All_Raffles.css";

const All_Raffles = ({ newRaffle }) => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  const [raffles, setRaffles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRaffles = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const res = await axios.get(`${url}/raffles`);
      setRaffles(res.data.data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRaffles();
  }, []);

  useEffect(() => {
    if (newRaffle) {
      setRaffles((prevRaffles) => [...prevRaffles, newRaffle]);
    }
  }, [newRaffle]);

  const renderContent = () => {
    if (loading) {
      return <p>Loading.....</p>;
    } else if (errorMessage) {
      return <p>Error: {errorMessage}</p>;
    }
  };

  return (
    <div className="listOfRaffles">
      {renderContent()}
      <h3>All Raffles</h3>
      <div className="raffles-list">
        {raffles.map((raffle) => {
          return (
            <div
              key={raffle.id}
              className="singleRaffle"
              onClick={() => navigate(`/raffles/${raffle.id}`)}
            >
              <p className="raffle-title">{raffle.title}</p>
              <p>
                Winner Id:{" "}
                {raffle.winner_id === null ? "No one yet" : raffle.winner_id}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default All_Raffles;
