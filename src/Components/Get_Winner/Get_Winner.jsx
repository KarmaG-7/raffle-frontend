import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";
import Pick_Winner from "../Pick_Winner/Pick_Winner";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";

import "./Get_Winner.css";
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
    <>
      {" "}
      <NavBar id={id} />
      <div className="section-winner">
        {loading && <p>Loading...</p>}
        {errorMessage && <p>{errorMessage}</p>}
        {!loading && winnerInfo !== null && (
          <>
            <p className="info">Winner Information </p>
            <div className="eachPerson">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2JCSzOH4wUW6yEbRA0n2cDqz9H7UbPnVQt4_z4Mzy8RsLKqhdSpnPtgD9wPNkTFM1yIA&usqp=CAU"
                alt="winner"
              />
              <div className="information-winner">
                <div>
                  <IoMdPerson />
                  <p>
                    <strong>
                      {" "}
                      {winnerInfo.first_name} {winnerInfo.last_name}
                    </strong>
                  </p>
                </div>
                <div>
                  <MdOutlineMail />
                  <p>{winnerInfo.email}</p>
                </div>
                <div>
                  <FaPhoneFlip />
                  <p>{winnerInfo.phone || "N/A"}</p>
                </div>

                <p className="congrats">Congratulations!!!</p>
              </div>
            </div>
          </>
        )}

        {!loading && winnerInfo === null && (
          <Pick_Winner chosenOne={chosenOne} />
        )}
      </div>
    </>
  );
};

export default Get_Winner;
