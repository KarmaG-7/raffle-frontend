import React from "react";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";

const SingleRaffle = () => {
  const { id } = useParams();

  return <NavBar id={id} />;
};

export default SingleRaffle;
