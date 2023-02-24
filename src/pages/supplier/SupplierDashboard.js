import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowRightSquare, BsPlusCircle } from "react-icons/bs";
import { FaSearch, FaHome } from "react-icons/fa";
import "./Supplier.css";
import { useContext } from "react";
import TableContext from "../../context/TableContext";
// import AuthContext from "../../context/AuthContext";

const SupplierDashboard = () => {
  const navigate = useNavigate();
  const {
    activeItem, 
    setActiveItem,
    searchResult, 
    setSearchResult
  } = useContext(TableContext);


  const current = new Date();
  const date = `${current.toLocaleString("en-US", {
    weekday: "long",
  })}, ${current.toLocaleString("en-US", {
    month: "long",
  })} ${current.getDate()}, ${current.getFullYear()}`;
 

  return (
    <div className="supply">
      <div>
        <span style={{fontSize:'1.5rem', fontWeight:"bold"}}>
          {date}
        </span>
        <div className="ims__topDashBoard">
          <div
            className={`${
              activeItem === "SUPPLIER" ? "order-active" : "card"
            }`}
            onClick={() =>  setActiveItem("SUPPLIER")}
          >
            <span className="order__type">Suppliers</span>
            <p className="order__count">
              <span>
                {30}
              </span>

              <BsArrowRightSquare size={25} />
            </p>
          </div>

          <div
            className={`${
              activeItem === "PLACED" ? "order-active" : "card"
            }`}
            onClick={() =>  setActiveItem("PLACED")}
          >
            <span className="order__type">Placed Orders</span>
            <p className="order__count">
              <span>{15}</span>

              <BsArrowRightSquare size={25} />
            </p>
          </div>

          <div
            className={`${
              activeItem === "RECEIVED" ? "order-active" : "card"
            }`}
            onClick={() => setActiveItem("RECEIVED")}
          >
            <span className="order__type">Received Orders</span>
            <p className="order__count">
              <span>{30}</span>

              <BsArrowRightSquare size={25} />
            </p>
          </div>

          <div className="card">
            <span className="order__type">Total Cost of Placed Orders</span>
            <p className="order__count1">
              <span>₦{45000}</span>
            </p>
          </div>

          <div className="card">
            <span className="order__type">Total Cost of Received Orders</span>
            <p className="order__count1">
              <span>₦{100000}</span>
            </p>
          </div>
        </div>

        <div className="ims__mid2">
          <div className="ims__search2">
            <form>
              <FaSearch size={15} className="search__icon" color="#343f50" />
              <input
                type="text"
                placeholder="search by supplier name"
                value={searchResult}
                onChange={(e) => setSearchResult(e.target.value)}
                autoFocus
              />
            </form>
          </div>

          <div
            className="ims--place__order2"
            onClick={() => navigate("/supplier/add-supplier")}
              >
                <span className="order__badge2">
                  <BsPlusCircle size={20} />
                </span>
                <span>Add New Supplier</span>
              </div>

        </div>
            

       
      </div>
    </div>
  );
};

export default SupplierDashboard;
