import "../Settings.css";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";

const Reports = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="back__button" onClick={() => navigate(-1)}>
        <MdOutlineArrowBackIos size={25} />
        <p className="goback__text">Go Back</p>
        </div>
        <h1 style={{ fontSize: "2rem", paddingLeft:"3rem" }}>Reports</h1>
      <div className="settings__wrapper">
        <Link to="/settings/reports/individual">Individual reports</Link>
        <Link to="/settings/reports/general">general reports</Link>
      </div>
    </>
  );
};

export default Reports;
