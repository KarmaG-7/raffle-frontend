import "./Header.css";
import { useNavigate } from "react-router-dom";
import { FaTicketAlt } from "react-icons/fa";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header-title">
        <FaTicketAlt className="header-icon" onClick={() => navigate("/")} />
        <p className="raffleApp" onClick={() => navigate("/")}>
          Raffle App
        </p>
      </div>
    </div>
  );
};

export default Header;
