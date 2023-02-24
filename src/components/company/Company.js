import { useContext } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import AuthContext from "../../context/AuthContext";
import "./Company.css";
const Company = () => {
  const { user } = useContext(AuthContext);
  const currentDate = new Date();
  const date = `${currentDate.toLocaleString("en-US", {
    weekday: "long",
  })}, ${currentDate.toLocaleString("en-US", {
    month: "long",
  })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  const currentTime = new Date();
  const time = currentTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  return (
    <>
      <div className="company__wrapper">
        <div className="nav__logo--company">
          <img src="/logo.png" alt="" width={"100%"} />
        </div>
        <div className="company__details">
          <div className="contact">
            <MdLocationOn size={20} />
            <span>
              3D Igboeze Street, <br /> Independence Layout.
            </span>
          </div>{" "}
          <br />
          <div className="contact">
            <FaPhoneAlt />
            <span>09015290078</span>
          </div>
        </div>
      </div>
      <div className="waiter">
        <div>
          <h4 style={{ display: "inline" }}>Name: </h4>
          {user.username}
        </div>

        <div>
          <h4 style={{ display: "inline" }}>Date: </h4>
          {date}
        </div>

        <div className="waiter">
        <div>
          <h4 style={{ display: "inline" }}>Time: </h4>
          <span>{time}</span>
        </div>
      </div>
      </div>
      
    </>
  );
};

export default Company;
