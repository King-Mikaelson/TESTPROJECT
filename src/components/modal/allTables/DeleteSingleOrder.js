import { toast } from "react-toastify";
import { useContext } from "react";
import "../Modal.css";
import TableContext from "../../../context/TableContext";
import AuthContext from "../../../context/AuthContext";
import { MdDeleteOutline } from "react-icons/md";

const DeleteSingleOrder = ({ order, table_name, arr }) => {
  const { getAdminDetails, getBarman } = useContext(TableContext);
  const { user, getDetails, toastOptions } = useContext(AuthContext);
  const activeUser = user.username;
  const activePasscode = user.passcode;
  const product = order.item.product;
  const role = user.role;

  const deleteItemCall = async (
    activeUser,
    activePasscode,
    product,
    table_name
  ) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/delete-order",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
            product,
            table_name,
          }),
        }
      );
      if (response.status === 200) {
        toast.success("Item successfully deleted from order", toastOptions);
        if (user.role === "Super Admin" || user.role === "Administrator") {
          getAdminDetails(activeUser, activePasscode, role, table_name);
        } else if (user.role === "Bar Man") {
          getBarman(activeUser, activePasscode, table_name);
        } else {
          getDetails(activeUser, activePasscode, table_name);
        }
      } else {
        toast.error("Couldn't delete Item from order", toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="ims__modalCenter">
      <h3>Choose Items to delete</h3>
      <ul>
        {arr.map((element, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "8px",
              marginBottom: "1rem",
            }}
          >
            {element.item.product}
            <MdDeleteOutline
              size={15}
              style={{ marginBottom: "-0.2rem", cursor: "pointer" }}
              color="red"
              onClick={() =>
                deleteItemCall(
                  activeUser,
                  activePasscode,
                  element.item.product,
                  table_name
                )
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteSingleOrder;
