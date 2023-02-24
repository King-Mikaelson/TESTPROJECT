import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./Notifications.css";

const WaiterNotif = () => {
  const { waiter } = useParams();
  const { getNotifs } = useContext(AuthContext);
  const navigate = useNavigate();
  const [waiterOrder, setWaiterOrder] = useState([]);
  //GET WAITER ORDERS
  const getWaiterOrders = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/notification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            waiter,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setWaiterOrder(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //UPDATE NOTIFICATIONS
  const updateNotifs = async (waiter) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/update-notification",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            waiter,
          }),
        }
      );

      if (response.status === 200) {
        getNotifs();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWaiterOrders();
  }, []);

  return (
    <div className="form__wrapper">
      <button
        onClick={() => {
          navigate(-1);
          updateNotifs(waiter);
        }}
      >
        Back
      </button>
      <p className="waiters__name">{waiter}</p>
      {waiterOrder.map((order, index) => (
        <div
          key={index}
          className={
            order.status === "UNREAD"
              ? "waiters__notif unread"
              : "waiters__notif"
          }
        >
          <span>{order.item}</span>
          <span>{order.quantity}</span>
        </div>
      ))}
    </div>
  );
};

export default WaiterNotif;
