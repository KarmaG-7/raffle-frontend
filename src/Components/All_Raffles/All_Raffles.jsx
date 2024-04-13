import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HiMiniTrophy } from "react-icons/hi2";
import { PiCalendarBlankLight, PiCalendarCheckBold } from "react-icons/pi";
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
      setErrorMessage(error.response.data.error);
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
      return <p className="message">Loading.....</p>;
    } else if (errorMessage) {
      return <p className="message">Error: {errorMessage}</p>;
    }
  };

  const formatDateTime = (currentDate) => {
    const date = new Date(currentDate);
    const formattedDateTime = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return formattedDateTime;
  };

  return (
    <div className="listOfRaffles">
      {renderContent()}
      <h3>All Raffles</h3>
      <p>Below is a list of all the raffles:</p>
      <div className="raffles-list">
        {raffles.map((raffle) => {
          const { title, created, draw, winner_id } = raffle;
          return (
            <div
              key={raffle.id}
              className="singleRaffle"
              onClick={() => navigate(`/raffles/${raffle.id}`)}
            >
              <p className="raffle-title">{title}</p>
              <div className="single-raffle-info">
                <PiCalendarBlankLight />
                <p>Created on: {formatDateTime(created)}</p>
              </div>
              <div className="single-raffle-info">
                <HiMiniTrophy />
                <p>
                  Winner Id:{" "}
                  {winner_id === null ? "No one yet" : raffle.winner_id}
                </p>
              </div>
              <div className="single-raffle-info">
                <PiCalendarCheckBold />
                {draw === null && <p>Not raffaled yet</p>}
                {draw !== null && <p>Raffled on: {formatDateTime(draw)}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default All_Raffles;
