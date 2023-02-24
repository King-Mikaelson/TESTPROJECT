import { useState, createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { cartReducer } from "./Reducer";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // AUTHENTICATICATION
  const [user, setUser] = useState(() =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const loginUser = async (username, password) => {
    try {
      const response = await fetch("https://swift-lounge.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/orders");
      } else {
        setLoading(false);
        setErrMsg("Invalid login details");
      }
    } catch (err) {
      setErrMsg("Network Error");
      setLoading(false);
    }
  };

  const initialCartState = {
    items: [],
    cart: [],
  };
  const [activeCategory, setActiveCategory] = useState("All Menu");

  const [searchQuery, setSearchQuery] = useState("");

  const displayItems = async (department) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/items/department",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            department,
          }),
        }
      );
      const data = await response.json();
      // const undeleted = data.filter(
      //   (item) => item.deleted_status === "FALSE"
      // );
      const sorted = data.sort((a, b) => a.product.localeCompare(b.product));
      dispatch({
        type: "INITIALIZE_CART",
        payload: {
          ...initialCartState,
          items: sorted,
        },
      });
      setActiveCategory("All Menu");
      setSearchQuery("");
    } catch (err) {}
  };

  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // PRODUCTS FILTER
  const transformItems = (items) => {
    let sortedProducts = items;

    if (activeCategory === "All Menu") {
      sortedProducts = items;
    }

    if (activeCategory === "Beers") {
      sortedProducts = sortedProducts.filter(
        (item) => item.category === "Beers"
      );
    }

    if (activeCategory === "Meals") {
      sortedProducts = sortedProducts.filter(
        (item) => item.category === "Meals"
      );
    }

    if (activeCategory === "Soft Drinks") {
      sortedProducts = sortedProducts.filter(
        (item) => item.category === "Soft Drinks"
      );
    }

    if (activeCategory === "Energy drink") {
      sortedProducts = sortedProducts.filter(
        (item) => item.category === "Energy drink"
      );
    }

    if (activeCategory === "Wines") {
      sortedProducts = sortedProducts.filter(
        (item) => item.category === "Wines"
      );
    }

    if (activeCategory === "Cigarettes") {
      sortedProducts = sortedProducts.filter(
        (item) => item.category === "Cigarettes"
      );
    }

    if (activeCategory === "Soups/Swallow") {
      sortedProducts = sortedProducts.filter(
        (item) => item.category === "Soups/Swallow"
      );
    }

    if (activeCategory === "Grills") {
      sortedProducts = sortedProducts.filter(
        (item) => item.category === "Grills"
      );
    }

    if (activeCategory === "Noodles") {
      sortedProducts = sortedProducts.filter(
        (item) => item.category === "Noodles"
      );
    }

    if (activeCategory === "Rice") {
      sortedProducts = sortedProducts.filter(
        (item) => item.category === "Rice"
      );
    }

    if (activeCategory === "Chips") {
      sortedProducts = sortedProducts.filter(
        (item) => item.category === "Chips"
      );
    }

    if (searchQuery !== "") {
      sortedProducts = items.filter((prod) =>
        prod.product.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return sortedProducts;
  };

  useEffect(() => {
    if (user) {
      setUser(user);
    }
    setLoading(false);
  }, []);

  const logoutUser = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
    setAdminTables([]);
    toggleSideBar(false);
    toggleCartMenu(false);
    setActiveCategory("All Menu");
    setSearchQuery("");
  };

  // SIDEBAR DISPLAY
  const [showSideBar, toggleSideBar] = useState(false);

  // CART DISPLAY
  const [showCartMenu, toggleCartMenu] = useState(false);

  // CLOSE TABLE
  const [tableOpen, setTableOpen] = useState(true);

  //DISPLAY ALL TABLES FOR ADMIN
  const [adminTables, setAdminTables] = useState([]);

  const displayAdminTables = async (activeUser, activePasscode) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/all-tables",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
          }),
        }
      );
      const data = await response.json();
      const sorted = data.sort((a, b) => b.status.localeCompare(a.status));
      setAdminTables(sorted);
    } catch (err) {}
  };

  //DISPLAY WAITER'S TABLES
  const [tables, setTables] = useState([]);

  const displayTables = async (activeUser) => {
    try {
      const response = await fetch("https://swift-lounge.onrender.com/tables", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activeUser,
        }),
      });
      const data = await response.json();
      setTables(data);
    } catch (err) {
      console.log(err);
    }
  };

  //GET ORDERS FOR A TABLE
  const [orders, setOrders] = useState([]);

  const getDetails = async (activeUser, activePasscode, table_name) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/get-orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
            table_name,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setOrders(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //GET ORDERS FOR A TABLE (ADMIN)
  const [adminOrders, setAdminOrders] = useState([]);

  const getAdminDetails = async (
    activeUser,
    activePasscode,
    role,
    table_name
  ) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/get-orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
            role,
            table_name,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAdminOrders(data);
      }
    } catch (error) {}
  };

  //GET ORDER COUNT FOR USER
  const [orderCount, setOrderCount] = useState(0);

  const getOrderCount = async (activeUser, activePasscode) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/order-count",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
          }),
        }
      );
      const data = await response.json();
      setOrderCount(data.order_count);
    } catch (error) {}
  };

  // TOAST OPTIONS
  const toastOptions = {
    pauseOnHover: true,
    position: "top-center",
    autoClose: 2000,
    theme: "dark",
  };

  // UNCLEARED TABLES
  const unCleared = adminTables?.filter(
    (table) => table.delete_status === "FALSE"
  );

  const tablesUncleared = tables?.filter(
    (table) => table.delete_status === "FALSE"
  );

  //PAYMENTS SUMMATION UNCLEARED
  const cashPaymentsUncleared = tablesUncleared?.reduce((accumulator, obj) => {
    return accumulator + obj.cash;
  }, 0);

  const posPaymentsUncleared = tablesUncleared?.reduce((accumulator, obj) => {
    return accumulator + obj.pos;
  }, 0);

  const transferPaymentsUncleared = tablesUncleared?.reduce(
    (accumulator, obj) => {
      return accumulator + obj.transfer;
    },
    0
  );

  const totalRevenueUncleared =
    cashPaymentsUncleared + posPaymentsUncleared + transferPaymentsUncleared;
  //PAYMENTS SUMMATION
  const cashPayments = tables?.reduce((accumulator, obj) => {
    return accumulator + obj.cash;
  }, 0);

  const posPayments = tables?.reduce((accumulator, obj) => {
    return accumulator + obj.pos;
  }, 0);

  const transferPayments = tables?.reduce((accumulator, obj) => {
    return accumulator + obj.transfer;
  }, 0);

  const totalRevenue = cashPayments + posPayments + transferPayments;

  //Admin Tables Uncleared
  const adminCashUncleared = unCleared?.reduce((accumulator, obj) => {
    return accumulator + obj.cash;
  }, 0);

  const adminPosUncleared = unCleared?.reduce((accumulator, obj) => {
    return accumulator + obj.pos;
  }, 0);

  const adminTransferUncleared = unCleared?.reduce((accumulator, obj) => {
    return accumulator + obj.transfer;
  }, 0);

  const adminTotalUncleared =
    adminCashUncleared + adminPosUncleared + adminTransferUncleared;

  //Admin Tables
  const adminCashPayments = adminTables?.reduce((accumulator, obj) => {
    return accumulator + obj.cash;
  }, 0);

  const adminPosPayments = adminTables?.reduce((accumulator, obj) => {
    return accumulator + obj.pos;
  }, 0);

  const adminTransferPayments = adminTables?.reduce((accumulator, obj) => {
    return accumulator + obj.transfer;
  }, 0);

  const adminTotalRevenue =
    adminCashPayments + adminPosPayments + adminTransferPayments;

  //WAITER NOTIFICATIONS
  const [waiterNotifs, setWaiterNotifs] = useState([]);
  const getNotifs = async () => {
    try {
      const response = await fetch("https://swift-lounge.onrender.com/waiters");
      const data = await response.json();
      if (response.status === 200) {
        setWaiterNotifs(data);
      } else if (response.status === 400) {
        setWaiterNotifs([]);
      }
    } catch (err) {
      setWaiterNotifs([]);
    }
  };

  //NOTIFICATION COUNT
  const [notifCount, setNotifCount] = useState(0);
  const getNotifCount = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/notification-count"
      );
      const data = await response.json();
      setNotifCount(data.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?.role === "Bar Man") {
      getNotifCount();
    }
  }, []);

  const contextData = {
    searchQuery,
    setSearchQuery,
    displayItems,
    transformItems,
    user,
    tableOpen,
    setTableOpen,
    setUser,
    loading,
    setLoading,
    errMsg,
    setErrMsg,
    activeCategory,
    setActiveCategory,
    loginUser,
    logoutUser,
    state,
    dispatch,
    showSideBar,
    toggleSideBar,
    showCartMenu,
    toggleCartMenu,
    orders,
    setOrders,
    tables,
    displayTables,
    adminTables,
    setAdminOrders,
    displayAdminTables,
    getDetails,
    getAdminDetails,
    adminOrders,
    getOrderCount,
    toastOptions,
    cashPayments,
    posPayments,
    transferPayments,
    totalRevenue,
    orderCount,
    adminCashPayments,
    adminPosPayments,
    adminTransferPayments,
    adminTotalRevenue,
    waiterNotifs,
    notifCount,
    getNotifs,
    adminCashUncleared,
    adminPosUncleared,
    adminTransferUncleared,
    adminTotalUncleared,
    cashPaymentsUncleared,
    posPaymentsUncleared,
    transferPaymentsUncleared,
    totalRevenueUncleared,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
