import React from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
import TableContext from "../../../context/TableContext";

const ReceiveOrder = ({ order, closeModal }) => {
  const { toastOptions } = useContext(AuthContext);
  const { displayImsOrders } = useContext(TableContext);
  const receiveOrder = async () => {
    try {
      fetch("https://swift-lounge.onrender.com/ims/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: order.product,
          status: "RECEIVED",
        }),
      }).then((res) => {
        if (res.ok) {
          toast.success("Order has been Received", toastOptions);
          displayImsOrders();
        } else toast.error("Failed to receive order", toastOptions);
      });
    } catch (error) {}
  };
  return (
    <div className="ims__modalCenter">
      <h1>
        Are You Sure this item has <br /> been received?
      </h1>
      <div className="ims__btns">
        <button onClick={receiveOrder}>yes</button>
        <button onClick={closeModal} id="bg">
          no
        </button>
      </div>
    </div>
  );
};

export default ReceiveOrder;
