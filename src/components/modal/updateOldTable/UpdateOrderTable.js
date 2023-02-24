import { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import Company from "../../company/Company";
import Orders from "./Orders";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";

export default function UpdateOrderTable({ table, closeModal }) {
  const {
    user,
    toastOptions,
    orders,
    getDetails,
    adminOrders,
    getAdminDetails,
  } = useContext(AuthContext);
  const table_name = table.table_name;
  const activeUser = user.username;
  const activePasscode = user.passcode;
  const role = user.role;
  const navigate = useNavigate();

  // UPDATE ORDER CALL
  const {
    state: { cart },
    dispatch,
  } = useContext(AuthContext);
  const [order, setOrder] = useState(cart);
  const updateOrder = () => {
    if (!order.length) {
      toast("Please add items to cart", toastOptions);
    } else {
      updateOrderCall();
    }
  };

  const updateOrderCall = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/update-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activePasscode,
            activeUser,
            table_name,
            order,
          }),
        }
      );

      if (response.ok) {
        toast(`Updated table for ${table_name}`, toastOptions);
        setOrder([]);
        dispatch({ type: "CLEAR_CART" });

        if (user.role === "Super Admin" || user.role === "Administrator") {
          getAdminDetails(activeUser, activePasscode, role, table_name);
        } else {
          getDetails(activeUser, activePasscode, table_name);
        }
        navigate("/dashboard");
      } else {
        toast.success(`Failed to update table`, toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user.role === "Super Admin" || user.role === "Administrator") {
      getAdminDetails(activeUser, activePasscode, role, table_name);
    } else {
      getDetails(activeUser, activePasscode, table_name);
    }
  }, [activeUser, activePasscode, role, table_name]);

  return (
    <div className="modal__center tableDetails">
      <div className="table__receipt">
        <MdOutlineArrowBackIos onClick={closeModal} size={40} />
        <h4>Table Bill: {table.table_name}</h4>
        <hr />
        <Company />
        {user.role === "Super Admin" || user.role === "Administrator" ? (
          <table className="table">
            <thead className="thead">
              <tr className="table__header__row">
                <th className="th">Description</th>
                <th className="th">Price</th>
                <th className="th">Quantity</th>
                <th className="th">Subtotal</th>
                <th className="th"></th>
              </tr>
            </thead>
            {adminOrders.map((t, index) => (
              <Orders
                order={t}
                key={index}
                table_name={table.table_name}
                table={table}
                orders={orders}
              />
            ))}
          </table>
        ) : (
          <table className="table">
            <thead className="thead">
              <tr className="table__header__row">
                <th className="th">Description</th>
                <th className="th">Price</th>
                <th className="th">Quantity</th>
                <th className="th">Subtotal</th>
                <th className="th"></th>
              </tr>
            </thead>
            {orders.map((t, index) => (
              <Orders
                order={t}
                key={index}
                table_name={table.table_name}
                table={table}
                orders={orders}
              />
            ))}

            {order.length && (
              <>
                <tr>
                  <td className="td"></td>
                  <td className="td"></td>
                  <td className="td"></td>
                  <td className="td"></td>
                </tr>
                <thead className="thead">
                  <tr className="table__header__row">
                    <th className="th">New Order Placed</th>
                    <th className="th"></th>
                    <th className="th"></th>
                    <th className="th"></th>
                    <th className="th"></th>
                  </tr>
                </thead>
                {order.map((t, index) => (
                  <tr key={index}>
                    <td className="td">{t.product}</td>
                    <td className="td">₦{t.price}</td>
                    <td className="td">{t.quantity}</td>
                    <td className="td">₦{t.quantity * t.price}</td>
                  </tr>
                ))}
              </>
            )}
          </table>
        )}

        <button onClick={updateOrder} className="receipt__btn">
          Update
        </button>
      </div>
    </div>
  );
}
