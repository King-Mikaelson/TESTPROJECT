import { useState, useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
import TableContext from "../../../context/TableContext";
import { AiOutlineCloseCircle } from "react-icons/ai";

const UpdateQty = ({ order, closeModal, setUpdateQty }) => {
  const [qty, setQty] = useState(order.qty);
  const { toastOptions } = useContext(AuthContext);
  const { displayImsItems, displayImsOrders } = useContext(TableContext);

  const _updateQty = async () => {
    try {
      fetch("https://swift-lounge.onrender.com/ims/update-order-quantity", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: order.product,
          qty,
        }),
      }).then((res) => {
        if (res.ok) {
          displayImsItems();
          displayImsOrders();
          toast.success("Quantity Updated", toastOptions);
        } else toast.error("Failed to update quantity", toastOptions);
      });
    } catch (error) {}
  };
  return (
    <div id="payments">
      <div className="close__modal" onClick={() => setUpdateQty(false)}>
        <AiOutlineCloseCircle size={25} />
      </div>
      <p>Enter Update Quantity:</p>
      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        autoFocus
      />
      <button id="bg" onClick={_updateQty}>
        Enter
      </button>
    </div>
  );
};

export default UpdateQty;
