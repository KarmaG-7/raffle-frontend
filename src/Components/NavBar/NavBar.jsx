import React from "react";
import { NavLink } from "react-router-dom";
import { FaTicketAlt } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { HiMiniUserGroup, HiMiniTrophy } from "react-icons/hi2";
import "./NavBar.css";

const NavBar = ({ id }) => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <NavLink to="/raffles">
            <FaTicketAlt className="icon" />
            <p>All Raffles</p>
          </NavLink>
        </li>

        <li>
          <NavLink to={`/raffles/${id}`}>
            <FaRegPenToSquare className="icon" />
            <p>Register</p>
          </NavLink>
        </li>

        <li>
          <NavLink to={`/raffles/${id}/participants`} className="active">
            <HiMiniUserGroup className="icon" />
            <p>Participants</p>
          </NavLink>
        </li>

        <li>
          <NavLink to={`/raffles/${id}/winner`} className="active">
            <HiMiniTrophy className="icon" />
            <p>Pick Winner</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
