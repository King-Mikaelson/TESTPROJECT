import React from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import TableContext from "../../../context/TableContext";
import AuthContext from "../../../context/AuthContext";

const CancelOrder = ({ order, closeModal }) => {
  const { toastOptions } = useContext(AuthContext);
  const { displayImsOrders } = useContext(TableContext);

  const cancelOrder = async () => {
    try {
      fetch("https://swift-lounge.onrender.com/ims/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: order.product,
          status: "CANCELLED",
        }),
      }).then((res) => {
        if (res.ok) {
          toast.success("Order has been Cancelled", toastOptions);
          displayImsOrders();
        } else toast.error("Failed to cancel order", toastOptions);
      });
    } catch (error) {}
  };
  return (
    <div className="ims__modalCenter">
      <h1>Are You Sure you want to cancel this order?</h1>
      <div className="ims__btns">
        <button onClick={cancelOrder}>yes</button>
        <button onClick={closeModal} id="bg">
          no
        </button>
      </div>
    </div>
  );
};

export default CancelOrder;
