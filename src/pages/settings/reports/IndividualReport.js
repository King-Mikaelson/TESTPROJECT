import { useNavigate } from "react-router-dom";
import "../Settings.css";
import { useEffect, useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";

const IndividualReport = () => {
  const [username, setUsername] = useState([]);
  const navigate = useNavigate();

  // A USE EFFECT FUNCTION THAT FETCHES ALL DATA FROM THE DATABASE
  useEffect(() => {
    const url = `https://swift-lounge.onrender.com/waiter-reports`;
    const getAllUsers = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setUsername(data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllUsers();
  }, []);

  return (
    <div className="main__div">
      <div className="back__button" onClick={() => navigate(-1)}>
        <MdOutlineArrowBackIos size={25} />
        <p className="goback__text">Go Back</p>
      </div>

      <div className="settings__wrapper">
        {username.map(
          (user) =>
            user.username !== null && (
              <div
                key={user.username}
                onClick={() => {
                  navigate(`/settings/reports/individual/${user.username}`);
                }}
              >
                <p>{user.username}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default IndividualReport;
