import { useContext } from "react";
import { FaSearch, FaPlusCircle } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import { GoThreeBars } from "react-icons/go";
import { MdOutlineInventory } from "react-icons/md";
import AuthContext from "../../context/AuthContext";
import "./TopBar.css";

const TopBar = () => {
  const current = new Date();
  const date = `${current.toLocaleString("en-US", {
    weekday: "long",
  })}, ${current.toLocaleString("en-US", {
    month: "long",
  })} ${current.getDate()}, ${current.getFullYear()}`;

  const { searchQuery, setSearchQuery, toggleSideBar, toggleCartMenu } =
    useContext(AuthContext);
  const {
    state: { cart },
    user,
  } = useContext(AuthContext);

  const menuActions = () => {
    toggleSideBar((prevValue) => !prevValue);
    toggleCartMenu(false);
  };
  return (
    <div className="topbar__container">
      <div className="menu__icons">
        <GoThreeBars size={25} onClick={menuActions} />
      </div>

      <form>
        <FaSearch size={20} className="search__icon" />
        <input
          type="text"
          placeholder="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      <div className="date">{date}</div>
      {user.role === "Super Admin" || user.role === "Administrator" ? (
        <div
          className="menu__icons"
          // style={{
          //   fontSize: "0.85rem",
          //   fontWeight: "600",
          //   backgroundColor: "var(--primary-color)",
          //   display: "flex",
          //   alignItems: "flex-start",
          //   padding: "0.5rem",
          //   borderRadius: "20px",
          //   color: "var(--yellow)",
          // }}
          onClick={() => {
            toggleCartMenu((prevValue) => !prevValue);
            toggleSideBar(false);
          }}
        >
          {/* <span>+</span> <span>Add Product</span> */}
          <BsPlusCircle size={30} style={{ marginRight: "2.5rem" }} />
        </div>
      ) : (
        <>
          <div className="menu__icons cart">
            <MdOutlineInventory
              size={25}
              onClick={() => {
                toggleCartMenu((prevValue) => !prevValue);
                toggleSideBar(false);
              }}
            />
          </div>
          <span
            onClick={() => {
              toggleCartMenu((prevValue) => !prevValue);
              toggleSideBar(false);
            }}
            className="cart__length"
          >
            {cart.length}
          </span>
        </>
      )}
    </div>
  );
};

export default TopBar;
