import "../Settings.css";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";

const StaffManager = () => {
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: "white", borderRadius: "8px", paddingTop:"20px" }}>
      <div className="back__button" onClick={() => navigate(-1)}>
        <MdOutlineArrowBackIos size={25} />
        <p className="goback__text">Go Back</p>
        </div>
      <div className="settings__wrapper">
        <Link to="/settings/staff/add">Add Staff</Link>
        <Link to="/settings/staff/update">Update Staff list</Link>
        <Link to="/settings/staff/credit">Grant Staff Credit</Link>
        <Link to="/settings/staff/roles">Change Staff role</Link>
      </div>
    </div>
  );
};

export default StaffManager;
