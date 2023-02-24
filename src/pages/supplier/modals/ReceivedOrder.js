import React from "react";
// import { useContext } from "react";
// import { toast } from "react-toastify";
// import AuthContext from "../../../context/AuthContext";
// import TableContext from "../../../context/TableContext";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ReceivedOrder = ({ closeModal, setReceive }) => {
  // const { toastOptions, user } = useContext(AuthContext);
  // const activeUser = user.username;
  // const activePasscode = user.passcode;
  // const { displayImsItems } = useContext(TableContext);
  // const deleteItem = async () => {
  //   try {
  //     fetch("https://swift-lounge.onrender.com/ims/delete-item", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         activeUser,
  //         activePasscode,
  //         product: order.product,
  //       }),
  //     }).then((res) => {
  //       if (res.ok) {
  //         toast.success("Item has been deleted", toastOptions);
  //         displayImsItems();
  //       } else toast.error("Failed to delete Item", toastOptions);
  //     });
  //   } catch (error) {}
  // };
  return (
    <div className="ims__modalCenter" style={{ textAlign: "center" }}>
      <div
        className="close__modal"
        id="bg"
        onClick={() => setReceive((prevValue) => !prevValue)}
      >
        <AiOutlineCloseCircle size={25} />
      </div>
      <h4 style={{ padding: "0", margin: "0" }}>
        Are you sure this order has been received
      </h4>
      <div className="ims__btns">
        <button
          id="bg"
          onClick={() => setReceive((prevValue) => !prevValue)}
          style={{ fontSize: "1rem", padding: "1rem" }}
        >
          yes
        </button>
        <button
          onClick={() => setReceive((prevValue) => !prevValue)}
          id="bg"
          style={{ fontSize: "1rem", padding: "1rem" }}
        >
          no
        </button>
      </div>
    </div>
  );
};

export default ReceivedOrder;
