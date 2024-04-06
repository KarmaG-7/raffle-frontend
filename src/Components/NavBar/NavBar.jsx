import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ id }) => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/raffles">All Raffles</Link>
        </li>
        <li>
          <Link to={`/raffles/${id}`}>Register</Link>
        </li>
        <li>
          <Link to={`/raffles/${id}/participants`}>Participants</Link>
        </li>
        <li>
          <Link to={`/raffles/${id}/winner`}>Pick Winner</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
