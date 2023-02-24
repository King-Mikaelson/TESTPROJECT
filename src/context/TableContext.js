import { useState } from "react";
import { useEffect } from "react";
import { createContext, useReducer } from "react";
import { toast } from "react-toastify";
import { deptReducer, orderReducer } from "./Reducer";

let pendingOrders = "...";
let receivedOrders = "...";
let cancelledOrders = "...";
let sortedTransactions = "...";
let totalCancelled = "...";
let totalPlaced = "...";
let totalReceived = "...";

const TableContext = createContext();

export default TableContext;

export const TableProvider = ({ children }) => {
  const initialDeptState = {
    dept: "Bar",
  };

  const [deptState, deptDispatch] = useReducer(deptReducer, initialDeptState);

  const initialOrderState = {
    barmanOrders: [],
    changedOrders: [],
  };

  const [barmanOrder, setBarmanOrders] = useState([]);

  const getBarman = async (activeUser, activePasscode, table_name) => {
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
        setBarmanOrders(data);
        dispatch({
          type: "INITIALIZE_ORDER",
          payload: {
            ...initialOrderState,
            barmanOrders: data,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //INPUT(BAR/LOUNGE) STATE

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
        dispatch({
          type: "INITIALIZE_ORDER",
          payload: {
            ...initialOrderState,
            changedOrders: data,
          },
        });
      }
    } catch (error) {}
  };

  const [state, dispatch] = useReducer(orderReducer, initialOrderState);

  //GET ALL ITEMS FOR IMS
  const [imsItems, setImsItems] = useState([]);

  const displayImsItems = async () => {
    try {
      const response = await fetch("https://swift-lounge.onrender.com/items");
      const data = await response.json();
      const undeleted = data.filter((item) => item.deleted_status === "FALSE");
      const sorted = undeleted.sort((a, b) =>
        a.product.localeCompare(b.product)
      );
      setImsItems(sorted);
    } catch (err) {}
  };

  useEffect(() => {
    displayImsItems();
  }, []);

  //GET IMS ORDERS
  const [imsOrders, setImsOrders] = useState([]);

  const displayImsOrders = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/ims/all-orders"
      );
      const data = await response.json();
      setImsOrders(data);
    } catch (err) {}
  };

  // useEffect(() => {
  //   displayImsOrders();
  // }, []);

  //GET CANCELLED ORDERS
  const [cancelledOrder, setCancelledOrder] = useState(0);

  const getCancelledOrder = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/ims/cancelled-order"
      );
      const data = await response.json();
      setCancelledOrder(data.count);
    } catch (err) {}
  };

  // useEffect(() => {
  //   getCancelledOrder();
  // }, []);

  //GET RECEIVED ORDERS
  const [receivedOrder, setReceivedOrder] = useState(0);

  const getReceivedOrder = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/ims/received-order"
      );
      const data = await response.json();
      setReceivedOrder(data.count);
    } catch (err) {}
  };

  // useEffect(() => {
  //   getReceivedOrder();
  // }, []);

  //FILTERING PLACED ORDERS
  const [placedOrdersFilter, setPlacedOrdersFilter] = useState("");
  const getplacedOrdersFilter = async (from, to) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/ims/order-transaction-date",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // const undeleted = data.filter(
        //   (item) => item.deleted_status === "FALSE"
        // );
        // const sorted = undeleted.sort((a, b) =>
        //   a.product.localeCompare(b.product)
        // );
        console.log(data);
        setPlacedOrdersFilter(data);
      } else {
        toast("Couldn't fetch transactions for this date");
      }
    } catch (error) {}
  };

  //GET ALL TRANSACTIONS FOR IMS
  const [imsTransactions, setImsTransactions] = useState([]);

  const displayImsTransactions = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/ims/sent-items"
      );
      const data = await response.json();
      console.log(data);

      setImsTransactions(data);
    } catch (err) {}
  };

  useEffect(() => {
    displayImsTransactions();
  }, []);

  //FILTERING TRANSACTIONS
  const [transactions, setTransactions] = useState("");
  const getTransactions = async (from, to) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/ims/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTransactions(data);
      } else {
        toast("Couldn't fetch transactions for this date");
      }
    } catch (error) {}
  };

  //FILTERING ALL ITEMS
  const [allItemsFilter, setAllItemsFilter] = useState("");
  const getAllItemsFilter = async (from, to) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/dates-filter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAllItemsFilter(data);
      } else {
        toast("Couldn't fetch transactions for this date");
      }
    } catch (error) {}
  };

  const [activeCategory, setActiveCategory] = useState("ALL ITEMS");
  const [activeDept, setActiveDept] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [activeItem, setActiveItem] = useState("SUPPLIER");
  const [activePage, setActivePage] = useState("PLACED ORDERS");

  const [searchResult, setSearchResult] = useState("");

  //TRANSFORM ORDERS
  const transformOrders = (items) => {
    let sortedOrders = items;

    if (searchQuery !== "") {
      sortedOrders = items.filter((prod) =>
        prod.product.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // if (searchQuery !== "" && activeCategory === "ALL ITEMS") {
    //   const searchProduct = imsItems.filter((prod) =>
    //     prod.product.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    //   if (!searchProduct) return <div>Couldn't find that item</div>;
    //   else return searchProduct;
    // }

    // if (searchQuery !== "" && allItemsFilter) {
    //   const searchProduct = allItemsFilter.filters.filter((prod) =>
    //     prod.product.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    //   if (!searchProduct) return <div>Couldn't find that item</div>;
    //   else return searchProduct;
    // }

    // }

    // if (activeCategory === "PENDING") {
    //   pendingOrders = imsOrders;
    //   totalPlaced = pendingOrders?.reduce(
    //     (acc, curr) => acc + curr.qty * curr.unitprice,
    //     0
    //   );

    //   return pendingOrders;
    // }

    // if (activeCategory === "RECEIVED") {
    //   receivedOrders = sortedOrders.filter(
    //     (item) => item.status === "RECEIVED"
    //   );

    //   totalReceived = receivedOrders?.reduce(
    //     (acc, curr) => acc + curr.qty * curr.unitprice,
    //     0
    //   );
    //   return receivedOrders;
    // }

    // if (activeCategory === "CANCELLED") {
    //   cancelledOrders = sortedOrders.filter(
    //     (item) => item.status === "CANCELLED"
    //   );
    //   totalCancelled = cancelledOrders?.reduce(
    //     (acc, curr) => acc + curr.qty * curr.unitprice,
    //     0
    //   );
    //   return cancelledOrders;
    // }

    // if (activeCategory === "TRANSACTIONS") {
    //   sortedTransactions = imsTransactions;
    //   if (activeDept === "") {
    //     sortedOrders = sortedTransactions;
    //   }
    //   if (activeDept === "Bar") {
    //     sortedOrders = sortedTransactions.filter(
    //       (item) => item.department === "Bar"
    //     );
    //   }
    //   if (activeDept === "Lounge") {
    //     sortedOrders = sortedTransactions?.filter(
    //       (item) => item.department === "Lounge"
    //     );
    //   }
    //   if (activeDept === "Kitchen") {
    //     sortedOrders = sortedTransactions.filter(
    //       (item) => item.department === "Kitchen"
    //     );
    //   }
    //   return sortedOrders;
    // }
    return sortedOrders;
  };
  //Filtering States
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  //Total of placed Orders
  const [totalPlacedOrders, setTotalPlaced] = useState();
  const [totalReceivedOrders, setTotalReceived] = useState();

  useEffect(() => {
    if (totalPlaced && totalCancelled && totalReceived) {
      setTotalPlaced(totalPlaced - totalCancelled);
      setTotalReceived(totalReceived);
    }
  }, [displayImsOrders]);

  //NOTIFICATIONS
  const sendNotifications = async (activeUser) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/dates-filter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: `${activeUser} took action`,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast("Couldn't record transaction");
      }
    } catch (error) {}
  };
  const contextData = {
    state,
    dispatch,
    adminOrders,
    setAdminOrders,
    getAdminDetails,
    displayImsOrders,
    displayImsItems,
    displayImsTransactions,
    setActiveCategory,
    setSearchQuery,
    searchQuery,
    activeCategory,
    transformOrders,
    pendingOrders,
    receivedOrders,
    cancelledOrders,
    getTransactions,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    activeDept,
    setActiveDept,
    barmanOrder,
    setBarmanOrders,
    getBarman,
    getplacedOrdersFilter,
    totalPlacedOrders,
    totalReceivedOrders,
    imsItems,
    imsOrders,
    imsTransactions,
    getAllItemsFilter,
    deptState,
    deptDispatch,
    transactions,
    allItemsFilter,
    placedOrdersFilter,
    setPlacedOrdersFilter,
    setTransactions,
    setAllItemsFilter,
    cancelledOrder,
    receivedOrder,
    sendNotifications,
    activeItem,
    setActiveItem,
    searchResult,
    setSearchResult,
    activePage,
    setActivePage,
  };

  return (
    <TableContext.Provider value={contextData}>
      {children}
    </TableContext.Provider>
  );
};
