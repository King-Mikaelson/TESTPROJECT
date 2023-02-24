import { GiWineBottle } from "react-icons/gi";
import { IoIosRestaurant } from "react-icons/io";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./Category.css";

const SingleProduct = ({ items }) => {
  const {
    state: { cart },
    dispatch,
    user,
  } = useContext(AuthContext);
  return (
    <div className="menu-item">
      <div style={{ textAlign: "center", position: "relative" }}>
        {(items.category === "Beers" ||
          items.category === "Soft Drinks" ||
          items.category === "Wines" ||
          items.category === "Energy drink") && (
          <p
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              position: "absolute",
              left: "0",
              top: "0%",
              transform: "translateY(-0%)",
            }}
          >
            {items.quantity}
          </p>
        )}
        <p style={{ fontSize: "1rem", padding: "0 50px" }}>
          {items.department}
        </p>

        {items.category === "Beers" ||
        items.category === "Soft Drinks" ||
        items.category === "Wines" ||
        items.category === "Energy drink" ? (
          <div className="menu-img">
            <GiWineBottle size={25} color="white" />
          </div>
        ) : (
          <div className="menu-img">
            <IoIosRestaurant size={25} color="white" />
          </div>
        )}
      </div>

      <div className="item-info">
        <header>
          <h2>{items.product}</h2>
          <h3 className="price">₦{items.price}</h3>
        </header>
      </div>
      {user.role !== "Store Manager" && (
        <>
          {cart.some((c) => c.product === items.product) ? (
            <button
              style={{
                backgroundColor: "transparent",
                border: "1px solid goldenrod",
                color: "black",
                borderRadius: "5px",
              }}
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: items,
                })
              }
            >
              Remove
            </button>
          ) : (
            <button
              disabled={
                (items.category === "Beers" ||
                  items.category === "Soft Drinks" ||
                  items.category === "Wines" ||
                  items.category === "Energy drink") &&
                items.quantity < 1
              }
              style={{ borderRadius: "5px" }}
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: items,
                })
              }
            >
              + Add
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SingleProduct;
