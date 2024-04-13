import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RaffleParticipants.css";
import { IoMdPerson } from "react-icons/io";
import { MdPersonSearch } from "react-icons/md";
const raffleParticipants = () => {
  const { id } = useParams();
  const url = import.meta.env.VITE_API_URL;

  const [allParticipants, setAllParticipants] = useState([]);
  const [searchInput, setSearchInput] = useState("");
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
      setErrorMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  let filteredParticipants = [...allParticipants];
  if (searchInput.length > 0) {
    filteredParticipants = allParticipants.filter((participant) => {
      const { first_name, last_name } = participant;
      const fullName = `${first_name.toLowerCase()} ${last_name.toLowerCase()}`;
      return fullName.includes(searchInput.toLowerCase());
    });
  }

  const renderContent = () => {
    if (loading) {
      return <p className="message">Loading.....</p>;
    } else if (errorMessage) {
      return <p className="message">Error: {errorMessage}</p>;
    } else if (filteredParticipants.length === 0 && searchInput.length > 0) {
      return <p>No participant with the name "{searchInput}" exist</p>;
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
        <div className="partcipantAndSearch">
          <p className="total">Total Participants: {allParticipants.length}</p>

          <div className="personSearch">
            <input
              type="text"
              className="search"
              placeholder="Search Participant"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <MdPersonSearch className="icon" />
          </div>
        </div>

        <div className="participants">
          {filteredParticipants.map((item) => {
            const { first_name, last_name, email, phone } = item;
            const fullName = `${
              first_name.charAt(0).toUpperCase() + first_name.slice(1)
            } ${last_name.charAt(0).toUpperCase() + last_name.slice(1)}`;
            return (
              <div className="eachPerson" key={item.id}>
                <IoMdPerson className="personIcon" />
                <div className="moreInfo">
                  <p>
                    <strong>{fullName}</strong>
                  </p>
                  <p>Email: {email}</p>
                  <p>Phone: {phone === "" ? "N/A" : phone}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default raffleParticipants;
