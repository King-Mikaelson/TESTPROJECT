import "../settings/Settings.css";
import { useNavigate } from "react-router-dom";
import TopMenu from "../../components/topbar/TopMenu";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import "./Notifications.css";

export default function Notifications() {
  const { waiterNotifs, getNotifs } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getNotifs();
  }, []);

  const clearNotifs = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/clear-notifications",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        getNotifs();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TopMenu />
      <div className="settings__wrapper">
        {!waiterNotifs.length ? (
          <div className="no__length">No New Notifications</div>
        ) : (
          <>
            <div className="clear" onClick={clearNotifs}>
              <p>clear notifications</p>
            </div>
            {waiterNotifs?.map((waiter, index) => (
              <div
                onClick={() => {
                  navigate(`/notifications/${waiter.waiter}`);
                }}
                className={
                  waiter.status === "UNREAD"
                    ? "products__manager unread"
                    : "products__manager"
                }
                key={index}
              >
                {waiter.waiter}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
