import React from "react";
import "./Inventory.css";
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TableContext from "../../context/TableContext";
import { FaCamera, FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import _ from "lodash";

const PlaceOrder = () => {
  const { toastOptions, user } = useContext(AuthContext);
  const { activeCategory, displayImsOrders, displayImsItems, imsItems } =
    useContext(TableContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const currentDate = new Date();
  const date = `${currentDate.toLocaleString("en-US", {
    weekday: "long",
  })}, ${currentDate.toLocaleString("en-US", {
    month: "long",
  })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  const [qty, setQty] = useState();
  const [size, setSize] = useState();
  const [metric, setMetric] = useState();
  const [unitPrice, setUnitPrice] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [errorMessage2, setErrorMessage2] = useState();
  const [price, setPrice] = useState();
  const [image, setImageFile] = useState("");
  const [category, setCategory] = useState("");
  const [reorder, setReorder] = useState(0);
  const activeUser = user.username;
  const activePasscode = +user.passcode;

  // A FUNCTION THAT SEARCHES FOR A MATCHING ITEM
  const [suggestions, setSuggestions] = useState([]);
  const { displayItems } = useContext(AuthContext);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [item, setItem] = useState("");
  const [department, setDepartment] = useState("");
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [isSeen, setIsSeen] = useState(false);
  const documentRef = useRef();
  const refDep = useRef();
  const departmentRef = useRef();

  const handleOutsideClick = () => {
    if (documentRef.current) {
      setIsVisible(false);
    }

    if (departmentRef.current) {
      setIsSeen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    ref.current = _.debounce(processRequest, 300);
    refDep.current = _.debounce(processRequestDep, 300);
  }, []);

  function processRequest(searchValue) {
    const array = imsItems.map(({ product }) => product);
    const result = array.filter((product) =>
      product.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSuggestions(result);

    if (result.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  function handleSubmit() {
    const array = imsItems.map(({ product }) => product);
    const result = array.find((product) =>
      product.toLowerCase().includes(item.toLowerCase())
    );

    const result2 = productCategories.find((category) =>
      category.toLowerCase().includes(department.toLowerCase())
    );

    if (!result && !result2) {
      setLoading(false);
      setErrorMessage(true);
      setErrorMessage2(true);
    } else if (result && result2) {
      // sendItems();
    } else if (!result) {
      setLoading(false);
      setErrorMessage(true);
    } else if (!result2) {
      setLoading(false);
      setErrorMessage2(true);
    }
  }

  const [productCategories, setProductCategories] = useState([
    "Bar",
    "Lounge",
    "Kitchen",
  ]);

  function processRequestDep(searchValue) {
    const result = productCategories.filter((category) =>
      category.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSuggestions(result);
    if (result.length > 0) {
      setIsSeen(true);
    } else {
      setIsSeen(false);
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    const { value } = event.target;
    setItem(value);
    ref.current(value);
    setErrorMessage(false);
  }

  function handleDepartment(event) {
    event.preventDefault();
    const { value } = event.target;
    setDepartment(value);
    refDep.current(value);
    setErrorMessage2(false);
  }

  function handleSuggestionClick(itemName) {
    setSelectedProduct(itemName);
    setItem(itemName);
    setIsVisible(false);
  }

  function handleCategoryClick(departmentName) {
    setSelectedProduct(departmentName);
    setDepartment(departmentName);
    setIsSeen(false);
  }

  //Add Products to system
  const addProduct = () => {
    if (item !== "") {
      setLoading(true);
      setTimeout(addProductCall, 3000);
    } else {
      toast("All fields are required.", toastOptions);
    }

    setItem("");
  };

  const addProductCall = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/new-item",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
            product: item,
            quantity: +qty,
            size: +size,
            reorder: +reorder,
            metric,
            image,
          }),
        }
      );
      if (response.status === 401) {
        toast.warn(`Product already exists`, toastOptions);
        setLoading(false);
      } else if (response.ok) {
        toast.success(`Product added successfully`, toastOptions);
        setLoading(false);
        setItem("");
        setQty("");
        setSize("");
        setReorder("");
        setImageFile("");
        setMetric("");
        displayImsItems();
        displayImsOrders();
      } else {
        toast.error(`Failed to add product`, toastOptions);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const placeOrder = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/ims/place-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product: item,
            qty: +qty,
            size: +size,
            metric,
            unitPrice: +unitPrice,
          }),
        }
      );
      if (response.ok) {
        toast.success(`Order placed successfully`, toastOptions);
        setLoading(false);
        setItem("");
        setQty("");
        setSize("");
        setMetric("");
        setUnitPrice("");
        displayImsOrders();
      } else {
        toast.error(`Failed to place order`, toastOptions);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  //Upload Image
  const uploadFile = (e) => {
    const data = new FormData();
    data.append("image", e.target.files[0]);
    axios.post("https://swift-lounge.onrender.com/upload", data).then((res) => {
      //print response status
      setImageFile(res.data.imgPath);
    });
  };

  return (
    <div className="placeorder__wrapper">
      <div className="ims__Itemdate">{date}</div>
      <div onClick={() => navigate(-1)} className="addItems__back">
        <MdOutlineArrowBackIos size={22} />
        <p style={{ fontSize: "1.2rem", margin: "0rem" }}>Go Back</p>
      </div>
      <div className="ims__back">
        {activeCategory === "ALL ITEMS" && (
          <span className="ims__addItem">Add Item</span>
        )}
        {activeCategory === "PENDING" && <span>Place Order</span>}
        {activeCategory === "TRANSACTIONS" && <span>Send Item</span>}
      </div>
      <div className="placeoorder_form">
        <form
          className="ims__form"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
          }}
        >
          <h1 className="ims__title">
            {activeCategory === "ALL ITEMS" && (
              <span>Add An Item to the System</span>
            )}
            {activeCategory === "PENDING" && (
              <span>Add Item to placed orders</span>
            )}
            {activeCategory === "TRANSACTIONS" && (
              <span>Send Item to Department</span>
            )}
          </h1>

          {activeCategory === "TRANSACTIONS" ? (
            <div className="ims__inputContainer">
              <input
                type="text"
                className="ims__input"
                value={item}
                name="country"
                onChange={handleSearch}
                autoComplete="off"
                autoFocus
                placeholder="Type a country name"
              />
              <label htmlFor="" className="ims__label">
                Enter Item Name
              </label>
              <div ref={documentRef}>
                {isVisible && (
                  <div
                    className={`${
                      isVisible ? "show suggestion-box" : "suggestion-box"
                    }`}
                  >
                    <ul>
                      {suggestions.map((country, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionClick(country)}
                        >
                          {country}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {errorMessage && (
                <p
                  className="instructions"
                  style={{ marginBottom: "1rem", fontSize: "0.8rem" }}
                >
                  <FaInfoCircle />
                  <span>Items Does Not Exist</span>
                </p>
              )}
            </div>
          ) : (
            <div className="ims__inputContainer">
              <input
                type="text"
                className="ims__input"
                placeholder="a"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                autoFocus
              />
              <label htmlFor="" className="ims__label">
                Enter Item Name
              </label>
            </div>
          )}

          <div className="ims__inputContainer">
            <input
              type="number"
              className="ims__input"
              placeholder="a"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              autoFocus
            />
            <label htmlFor="" className="ims__label">
              Quantity
            </label>
          </div>

          {activeCategory === "TRANSACTIONS" ? (
            <>
              <div className="ims__inputContainer">
                <input
                  type="text"
                  className="ims__input"
                  value={department}
                  name="department"
                  onChange={handleDepartment}
                  autoComplete="off"
                  autoFocus
                  placeholder="Type a Department name"
                />
                <label htmlFor="" className="ims__label">
                  Enter Department Name
                </label>
                <div ref={departmentRef}>
                  {isSeen && (
                    <div
                      className={`${
                        isSeen ? "show suggestion-box" : "suggestion-box"
                      }`}
                    >
                      <ul>
                        {suggestions.map((country, index) => (
                          <li
                            key={index}
                            onClick={() => handleCategoryClick(country)}
                          >
                            {country}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {errorMessage2 && (
                    <p
                      className="instructions"
                      style={{ marginBottom: "1rem", fontSize: "0.8rem" }}
                    >
                      <FaInfoCircle />
                      <span>Department Does Not exist</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="ims__inputContainer">
                <select
                  className="ims__input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" hidden className="placeholderSelect">
                    Select Category
                  </option>
                  <option value="Wines">Wines/Whisky</option>
                  <option value="Energy drink">Energy drink</option>
                  <option value="Beers">Beers</option>
                  <option value="Soft Drinks">Soft drinks</option>
                  <option value="Meals">Meals</option>
                  <option value="Cigarettes">Cigarettes</option>
                  <option value="Soups/Swallow">Soups/Swallow</option>
                  <option value="Grills">Grills</option>
                  <option value="Noodles">Noodles</option>
                  <option value="Rice">Rice</option>
                  <option value="Chips">Chips</option>
                </select>
              </div>

              <div className="ims__inputContainer">
                <input
                  type="number"
                  className="ims__input"
                  placeholder="a"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label htmlFor="" className="ims__label">
                  Price
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="ims__inputContainer">
                <input
                  type="number"
                  className="ims__input"
                  placeholder="a"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
                <label htmlFor="" className="ims__label">
                  Size
                </label>
              </div>

              <div className="ims__inputContainer">
                <input
                  type="text"
                  className="ims__input"
                  placeholder="a"
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                />
                <label htmlFor="" className="ims__label">
                  Unit Of Measurement (e.g ml, gram, litre, etc)
                </label>
              </div>

              {activeCategory === "ALL ITEMS" ? (
                <>
                  <div className="ims__inputContainer">
                    <input
                      type="number"
                      className="ims__input"
                      placeholder="a"
                      value={reorder}
                      onChange={(e) => setReorder(e.target.value)}
                    />
                    <label htmlFor="" className="ims__label">
                      Reorder Level
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <div className="ims__inputContainer">
                    <input
                      type="number"
                      className="ims__input"
                      placeholder="a"
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(e.target.value)}
                    />
                    <label htmlFor="" className="ims__label">
                      Unit Price
                    </label>
                  </div>
                </>
              )}
            </>
          )}

          {activeCategory === "ALL ITEMS" && (
            <button className="ims__submitBtn" onClick={addProduct}>
              {loading ? "Adding Item..." : "Add Item"}
            </button>
          )}

          {activeCategory === "PENDING" && (
            <button className="ims__submitBtn" onClick={placeOrder}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          )}

          {/* {activeCategory === "TRANSACTIONS" && (
            <button className="ims__submitBtn" onClick={handleSubmit}>
              {loading ? "Sending Item..." : "Send Item"}
            </button>
          )} */}
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
