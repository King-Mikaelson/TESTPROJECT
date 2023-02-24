import React, { useState, useEffect, useContext } from "react";
import "./Filters.css";
import AuthContext from "../../context/AuthContext";
import { MdWineBar } from "react-icons/md";
import TableContext from "../../context/TableContext";

const Filters = () => {
  const {
    deptState: { dept },
    deptDispatch,
  } = useContext(TableContext);
  const {
    activeCategory,
    setActiveCategory,
    displayItems,
    state: { items },
    dispatch,
    setSearchQuery,
  } = useContext(AuthContext);
  const [activeDept, setActiveDept] = useState(dept);

  const categories = ["all", ...new Set(items.map((item) => item.category))];

  useEffect(() => {
    changeItems();
  }, [dept]);

  function changeItems() {
    if (items) {
      dispatch({ type: "CLEAR_ITEMS" });
      displayItems(dept);
    }
  }

  return (
    <div id="filter__wrapper">
      <div className="filter__head">
        <p className="category_title">Choose Category:</p>
        <div className="radio-buttons">
          <span>
            <span
              className={`${activeDept === "Bar" ? "ims--dept" : "ims--title"}`}
              style={{
                cursor: "pointer",
                fontSize: "0.9rem",
                marginRight: "5px",
              }}
              onClick={() => {
                setActiveDept("Bar");
                deptDispatch({
                  type: "BAR",
                });
              }}
            >
              Bar
            </span>
          </span>

          <span>
            <span
              className={`${
                activeDept === "Lounge" ? "ims--dept" : "ims--title"
              }`}
              style={{
                cursor: "pointer",
                fontSize: "0.9rem",
                marginRight: "5px",
              }}
              onClick={() => {
                setActiveDept("Lounge");
                deptDispatch({
                  type: "LOUNGE",
                });
              }}
            >
              Lounge
            </span>
          </span>
        </div>
      </div>
      <div className="btn-container">
        {categories.map((category, index) => {
          return (
            <button
              type="button"
              className={`${
                activeCategory === category
                  ? "filter-btn btn-active"
                  : "filter-btn"
              }`}
              key={index}
              onClick={() => {
                setSearchQuery("");
                setActiveCategory(category);
              }}
            >
              <span className="filter__bar">
                <MdWineBar className="filter__icons" size={20} /> {category}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
