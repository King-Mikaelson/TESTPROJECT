import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import "./Newtable.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TopMenu from "../../components/topbar/TopMenu";

const NewTable = () => {
  const {
    state: { cart },
    dispatch,
    user,
    toastOptions,
    getNotifCount,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const activeUser = user.username;
  const activePasscode = user.passcode;
  const [table_name, setTableName] = useState("");
  const [order, setOrder] = useState(cart);
  const navigate = useNavigate();
  const newOrder = (e) => {
    e.preventDefault();
    if (!order.length) {
      toast("Please add items to the order", toastOptions);
    } else if (table_name === "") {
      toast("Enter table name", toastOptions);
    } else {
      setLoading(true);
      newOrderCall(activePasscode, activeUser, table_name, order);
    }
  };
  const newOrderCall = async (
    activePasscode,
    activeUser,
    table_name,
    order
  ) => {
    try {
      const response = await fetch("https://swift-lounge.onrender.com/order", {
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
      });
      if (response.ok) {
        toast.success(`Added new table for ${table_name}`, toastOptions);
        setLoading(false);
        setOrder([]);
        dispatch({
          type: "CLEAR_CART",
        });
        setTableName("");
        navigate("/dashboard");
        if (user.role === "Bar Man") {
          getNotifCount();
        }
      } else {
        toast(`Table already exists`, toastOptions);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <>
      <TopMenu />
      <div className="newtable__container">
        <h2>Table Management</h2>
        <article>
          <h2>manage your tables here</h2>
          <h3>Add A New Table</h3>
          <form onSubmit={newOrder}>
            <input
              type="text"
              placeholder="Enter Table Name"
              value={table_name}
              onChange={(e) => setTableName(e.target.value)}
              autoFocus
            />
            <button disabled={loading ? true : false}>
              {loading ? "Adding Table..." : "Add Table"}
            </button>
          </form>
        </article>
      </div>
    </>
  );
};

export default NewTable;
