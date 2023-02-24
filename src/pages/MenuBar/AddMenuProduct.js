import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import "./MenuBar.css";

const AddMenuProduct = () => {
  const { user, toastOptions, displayItems } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [metric, setMetric] = useState("");
  const [reorder, setReorder] = useState(0);
  const [size, setSize] = useState("");
  const [image, setImageFile] = useState("");
  const activeUser = user.username;
  const activePasscode = +user.passcode;
  const {
    state: { cart },
    dispatch,
    showCartMenu,
    toggleCartMenu,
    toggleSideBar,
  } = useContext(AuthContext);

  const menuAction = () => {
    toggleSideBar(false);
    toggleCartMenu(false);
  };

  const addProduct = (e) => {
    e.preventDefault();
    if (product !== "") {
      setLoading(true);
      setTimeout(addProductCall, 3000);
    } else {
      toast("All fields are required.", toastOptions);
    }

    setProduct("");
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
            product,
            quantity: +quantity,
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
      } else {
        toast.error(`Failed to add product`, toastOptions);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadFile = (e) => {
    const data = new FormData();
    data.append("image", e.target.files[0]);
    axios.post("https://swift-lounge.onrender.com/upload", data).then((res) => {
      //print response status
      setImageFile(res.data.imgPath);
    });
  };
  return (
    <div className="form__wrapper2 menubar__wrapper">
      <div className="add__header menu__close">
        <div className={showCartMenu ? "position" : "no-display"}>
          <FaTimes size={25} onClick={menuAction} />
        </div>
        <h1 className="page__name">Add New Product</h1>
      </div>
      <hr />
      <p style={{ padding: "1rem 0", fontSize: "1rem" }}>
        Add a new item to the system
      </p>
      <form className="form" onSubmit={addProduct}>
        <div className="ims__inputContainer">
          <input
            type="text"
            className="ims__input"
            placeholder="a"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
          <label htmlFor="" className="ims__label">
            Enter Item Name
          </label>
        </div>

        <div className="ims__inputContainer">
          <input
            type="number"
            className="ims__input"
            placeholder="a"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <label htmlFor="" className="ims__label">
            Quantity
          </label>
        </div>

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

        {/* <div className="file-input">
          <label htmlFor="file">
            <span>Upload Image</span>
            <FaCamera size={20} />
          </label>
          <input
            type="file"
            id="file"
            className="inputTag"
            onChange={uploadFile}
          />
        </div> */}

        <button style={{ borderRadius: "5px", padding: "2rem" }}>
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddMenuProduct;
