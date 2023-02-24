import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowRightSquare, BsPlusCircle } from "react-icons/bs";
import { FaSearch, FaHome } from "react-icons/fa";
import "./Inventory.css";
import { useContext } from "react";
import TableContext from "../../context/TableContext";
import AuthContext from "../../context/AuthContext";

const ImsDashboards = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    pendingOrders,
    receivedOrder,
    cancelledOrder,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    getTransactions,
    activeDept,
    setActiveDept,
    getplacedOrdersFilter,
    totalPlacedOrders,
    totalReceivedOrders,
    imsItems,
    getAllItemsFilter,
    imsTransactions,
    transactions,
    allItemsFilter,
    imsOrders,
    placedOrdersFilter,
    setPlacedOrdersFilter,
    setTransactions,
    setAllItemsFilter,
  } = useContext(TableContext);

  const clearFilters = () => {
    setPlacedOrdersFilter("");
    setTransactions("");
    setAllItemsFilter("");
  };

  return (
    <div className="ims">
      <div>
        <span
          className="ims__home"
          onClick={() => setActiveCategory("ALL ITEMS")}
        >
          <FaHome size={35} color="var(--primary-color)" />
        </span>
        <div className="ims__topDashBoard">
          <div
            className={`${
              activeCategory === "PENDING" ? "order-active" : "card"
            }`}
            onClick={() => setActiveCategory("PENDING")}
          >
            <span className="order__type">Placed Orders</span>
            <p className="order__count">
              <span>
                {!placedOrdersFilter
                  ? imsOrders?.length
                  : placedOrdersFilter?.count}
              </span>

              <BsArrowRightSquare size={25} />
            </p>
          </div>

          <div
            className={`${
              activeCategory === "RECEIVED" ? "order-active" : "card"
            }`}
            onClick={() => setActiveCategory("RECEIVED")}
          >
            <span className="order__type">Recieved Orders</span>
            <p className="order__count">
              <span>{receivedOrder}</span>

              <BsArrowRightSquare size={25} />
            </p>
          </div>

          <div
            className={`${
              activeCategory === "CANCELLED" ? "order-active" : "card"
            }`}
            onClick={() => setActiveCategory("CANCELLED")}
          >
            <span className="order__type">Cancelled Orders</span>
            <p className="order__count">
              <span>{cancelledOrder}</span>

              <BsArrowRightSquare size={25} />
            </p>
          </div>

          <div className="card">
            <span className="order__type">Total Cost of Placed Orders</span>
            <p className="order__count1">
              <span>₦{totalPlacedOrders?.toLocaleString("en-US")}</span>
            </p>
          </div>

          <div className="card">
            <span className="order__type">Total Cost of Received Orders</span>
            <p className="order__count1">
              <span>₦{totalReceivedOrders?.toLocaleString("en-US")}</span>
            </p>
          </div>

          <div
            className={`${
              activeCategory === "TRANSACTIONS" ? "order-active" : "card"
            }`}
            onClick={() => setActiveCategory("TRANSACTIONS")}
          >
            <span className="order__type">Transactions</span>
            <p className="order__count">
              <span>
                {!transactions ? imsTransactions?.length : transactions?.count}
              </span>
              <BsArrowRightSquare size={25} />
            </p>
          </div>
        </div>

        <div className="ims__mid2">
          <div className="ims__search">
            <form>
              <FaSearch size={15} className="search__icon" color="#343f50" />
              <input
                type="text"
                placeholder="search by item name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </form>
          </div>
          <>
            {/* ALL ITEMS */}
            {/* ORDER BUTTON */}
            {activeCategory === "ALL ITEMS" && (
              <div
                className="ims--place__order"
                onClick={() => navigate("/inventory/placeorder")}
              >
                <span className="order__badge">
                  <BsPlusCircle size={20} />
                </span>
                <span>Add Item</span>
              </div>
            )}
            {activeCategory === "ALL ITEMS" && (
              <div className="ims__date">
                <span>From</span>
                <span className="ims--place__order">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </span>

                <span>To</span>
                <span className="ims--place__order">
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </span>
                <button
                  onClick={() => getAllItemsFilter(fromDate, toDate)}
                  style={{
                    padding: "0.9rem 1rem",
                    borderRadius: "5px",
                    marginTop: "3px",
                  }}
                >
                  Get date
                </button>
                <button
                  onClick={clearFilters}
                  style={{
                    padding: "0.9rem 1rem",
                    borderRadius: "5px",
                    marginTop: "3px",
                  }}
                >
                  clear filters
                </button>
              </div>
            )}

            {activeCategory === "TRANSACTIONS" && (
              <div
                className="ims--place__order"
                onClick={() => navigate("/inventory/placeorder")}
              >
                <span className="order__badge">
                  <BsPlusCircle size={20} />
                </span>
                <span>Send Item</span>
              </div>
            )}

            {/* PENDING */}
            {activeCategory === "PENDING" && (
              <div className="ims__date">
                <span>From</span>
                <span className="ims--place__order">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </span>

                <span>To</span>
                <span className="ims--place__order">
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </span>
                <button
                  onClick={() => getplacedOrdersFilter(fromDate, toDate)}
                  style={{
                    padding: "0.9rem 1rem",
                    borderRadius: "5px",
                    marginTop: "3px",
                  }}
                >
                  Get date
                </button>
                <button
                  onClick={clearFilters}
                  style={{
                    padding: "0.9rem 1rem",
                    borderRadius: "5px",
                    marginTop: "3px",
                  }}
                >
                  clear filters
                </button>
              </div>
            )}

            {/* RECEIVED */}
            {activeCategory === "RECEIVED" && (
              <div className="">
                <span>From</span>
                <span className="ims--place__order">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </span>

                <span>To</span>
                <span className="ims--place__order">
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </span>
                <button
                  onClick={() => getplacedOrdersFilter(fromDate, toDate)}
                  style={{
                    padding: "0.9rem 1rem",
                    borderRadius: "5px",
                    marginTop: "3px",
                  }}
                >
                  Get date
                </button>
                <button
                  onClick={clearFilters}
                  style={{
                    padding: "0.9rem 1rem",
                    borderRadius: "5px",
                    marginTop: "3px",
                  }}
                >
                  clear filters
                </button>
              </div>
            )}
            {/* CANCELLED */}
            {activeCategory === "CANCELLED" && (
              <div className="ims__date">
                <span>From</span>
                <span className="ims--place__order">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </span>

                <span>To</span>
                <span className="ims--place__order">
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </span>
                <button
                  onClick={() => getplacedOrdersFilter(fromDate, toDate)}
                  style={{
                    padding: "0.9rem 1rem",
                    borderRadius: "5px",
                    marginTop: "3px",
                  }}
                >
                  Get date
                </button>
                <button
                  onClick={clearFilters}
                  style={{
                    padding: "0.9rem 1rem",
                    borderRadius: "5px",
                    marginTop: "3px",
                  }}
                >
                  clear filters
                </button>
              </div>
            )}

            {activeCategory === "TRANSACTIONS" &&
            user.role !== "Store Manager" ? (
              <div className="ims__date">
                <span>From</span>
                <span className="ims--place__order">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </span>

                <span>To</span>
                <span className="ims--place__order">
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </span>
                <button
                  onClick={() => getTransactions(fromDate, toDate)}
                  style={{
                    padding: "0.9rem 1rem",
                    borderRadius: "5px",
                    marginTop: "3px",
                  }}
                >
                  Get date
                </button>
                <button
                  onClick={clearFilters}
                  style={{
                    padding: "0.9rem 1rem",
                    borderRadius: "5px",
                    marginTop: "3px",
                  }}
                >
                  clear filters
                </button>
              </div>
            ) : undefined}
          </>
        </div>

        <div className="ims__topLabel">
          {/* ORDER TITLE */}
          {activeCategory === "ALL ITEMS" && (
            <div className="ims--title">
              <span>All Items</span>
              <span className="order__badge">
                {!allItemsFilter ? imsItems?.length : allItemsFilter?.count}
              </span>
            </div>
          )}

          {activeCategory === "PENDING" && (
            <div className="ims--title">
              <span>Placed Orders</span>
              <span className="order__badge">
                {!placedOrdersFilter
                  ? imsOrders?.length
                  : placedOrdersFilter?.count}
              </span>
            </div>
          )}

          {activeCategory === "RECEIVED" && (
            <div className="ims--title">
              <span>Received Orders</span>
              <span className="order__badge">{receivedOrder}</span>
            </div>
          )}

          {activeCategory === "CANCELLED" && (
            <div className="ims--title">
              <span>Cancel Order</span>
              <span className="order__badge">{cancelledOrder}</span>
            </div>
          )}

          {activeCategory === "TRANSACTIONS" && (
            <div className="ims__transactions">
              <h2
                className={`${activeDept === "" ? "ims--title" : ""}`}
                onClick={() => setActiveDept("")}
                style={{ cursor: "pointer" }}
              >
                All Items Distributed from the General Store
              </h2>
              <div>
                <span
                  className={`${
                    activeDept === "Bar" ? "ims--title" : "ims--dept"
                  }`}
                  style={{
                    display: "inline",
                    marginRight: "0.5rem",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveDept("Bar")}
                >
                  Bar
                </span>
                <span
                  className={`${
                    activeDept === "Lounge" ? "ims--title" : "ims--dept"
                  }`}
                  style={{
                    display: "inline",
                    marginRight: "0.5rem",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveDept("Lounge")}
                >
                  Lounge
                </span>
                <span
                  className={`${
                    activeDept === "Kitchen" ? "ims--title" : "ims--dept"
                  }`}
                  style={{
                    display: "inline",
                    marginRight: "0.5rem",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveDept("Kitchen")}
                >
                  Kitchen
                </span>
              </div>
            </div>
          )}

          {user.role === "Store Manager" ? (
            <>
              {activeCategory === "PENDING" && (
                <div
                  className="ims--place__order"
                  onClick={() => navigate("/inventory/placeorder")}
                >
                  <span className="order__badge">
                    <BsPlusCircle size={20} />
                  </span>
                  <span>Place Order</span>
                </div>
              )}

              {/*
               {activeCategory === "TRANSACTIONS" && (
                <div
                  className="ims--place__order"
                  onClick={() => navigate("/inventory/placeorder")}
                >
                  <span className="order__badge">
                    <BsPlusCircle size={20} />
                  </span>
                  <span>Send Item</span>
                </div>
              )} 
              */}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImsDashboards;
