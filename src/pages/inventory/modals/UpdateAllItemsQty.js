import { useState, useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
import TableContext from "../../../context/TableContext";
import { AiOutlineCloseCircle } from "react-icons/ai";

const UpdateAllItemsQty = ({ order, closeAll, setUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(order.quantity);
  const { user, toastOptions } = useContext(AuthContext);
  const { displayImsItems } = useContext(TableContext);

  const activeUser = user.username;
  const activePasscode = user.passcode;

  const _updateQuantity = async () => {
    try {
      fetch("https://swift-lounge.onrender.com/update-quantity", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activeUser: activeUser,
          activePasscode: activePasscode,
          product: order.product,
          quantity: +quantity,
        }),
      }).then((res) => {
        if (res.ok) {
          displayImsItems();
          toast.success("Quantity Updated", toastOptions);
          closeAll();
        } else toast.error("Failed to update quantity", toastOptions);
      });
    } catch (error) {}
  };

  const updateQty = () => {
    _updateQuantity();
  };
  return (
    <div id="payments">
      <div className="close__modal" onClick={() => setUpdateQuantity(false)}>
        <AiOutlineCloseCircle size={25} />
      </div>
      <p>Enter Updated Quantity:</p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        autoFocus
      />
      <button id="bg" onClick={updateQty}>
        Enter
      </button>
    </div>
  );
};

export default UpdateAllItemsQty;
