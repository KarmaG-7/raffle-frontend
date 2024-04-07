import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";
import Pick_Winner from "../Pick_Winner/Pick_Winner";

const Get_Winner = () => {
  const { id } = useParams();
  const [winnerInfo, setWinnerInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchWinner();
  }, []);

  const chosenOne = (data) => {
    setWinnerInfo(data);
  };

  const fetchWinner = async () => {
    try {
      const url = import.meta.env.VITE_API_URL;
      setErrorMessage("");
      const res = await axios.get(`${url}/raffles/${id}/winner`);
      setWinnerInfo(res.data.data);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="section-winner">
      <NavBar id={id} />
      <div>
        {loading && <p>Loading...</p>}
        {errorMessage && <p>{errorMessage}</p>}
        {!loading && winnerInfo !== null && (
          <div className="eachPerson">
            <p>Name: {winnerInfo.first_name}</p>
            <p>Email: {winnerInfo.email}</p>
            <p>Phone: {winnerInfo.phone || "N/A"}</p>
          </div>
        )}
      </div>
      {!loading && winnerInfo === null && <Pick_Winner chosenOne={chosenOne} />}
    </div>
  );
};

export default Get_Winner;
