import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useState, useEffect, useContext } from "react";
import "../Settings.css";
import AuthContext from "../../../context/AuthContext";
import { toast } from "react-toastify";

const StaffCredit = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { user, toastOptions } = useContext(AuthContext);
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "C.C",
      opening_credit: 0,
      credit_remaining: 0,
      credit_granted: 0,
    },
  ]);

  const url = `https://swift-lounge.onrender.com/credit-status`;
  const getAllUsers = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  // A USE EFFECT FUNCTION THAT FETCHES ALL DATA FROM THE DATABASE
  useEffect(() => {
    getAllUsers();
  }, []);

  // A FUNCTION TO GET THE NEW CREDIT OF THE USER
  const handleChange = (event) => {
    setUpdatedUser({ ...updatedUser, [event.target.name]: event.target.value });
  };

  // A FUNCTION TO GET THE USERNAME
  const updateUserDetails = (product) => {
    setUpdatedUser({ ...updatedUser, username: product.username });
  };

  // A STATE THAT HOLDS THE UPDATED DETAILS OF ADMIN AND USER THAT IS CHANGED
  const [updatedUser, setUpdatedUser] = useState({
    activeUser: user.username,
    activePasscode: user.passcode,
    username: "",
    opening_credit: 0,
  });

  // FUNCTION TO GRANT USER CREDIT
  const updateCredit = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/grant-credit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser: updatedUser.activeUser,
            activePasscode: updatedUser.activePasscode,
            username: updatedUser.username,
            opening_credit: +updatedUser.opening_credit,
          }),
        }
      );

      if (response.status === 200) {
        toast("Credit granted successfully", toastOptions);
        getAllUsers();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitCredit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    updateCredit();
    setUpdatedUser({ ...updatedUser, username: "", opening_credit: Number(0) });
  };

  return (
    <div className="form__wrapper">
      <div className="add__header">
        <div className="back__button" onClick={() => navigate(-1)}>
          <MdOutlineArrowBackIos size={25} />
          <p className="goback__text">Go Back</p>
        </div>
        <h1 className="page__name">Staff Credit</h1>
      </div>
      <hr />
      <div className="staff__name" style={{ display: "flex" }}>
        <p className="flex-items">Username</p>
        <p className="flex-items">Opening Credit</p>
        <p className="flex-items">Credit Granted</p>
        <p className="flex-items">Credit Remaining</p>
        <p className="flex-items">Grant Credit</p>
      </div>

      <div className="parent__wrapper">
        {users.map((product) => (
          <div
            onClick={() => {
              updateUserDetails(product);
            }}
            key={product.username}
            className="staff__wrapper"
          >
            <p className="flex-items">{product.username}</p>
            <p className="opening__credit flex-items">
              {product.opening_credit == null ? 0 : product.opening_credit}
            </p>
            <p className="closing__credit flex-items">
              {product.credit_granted == null ? 0 : product.credit_granted}
            </p>
            <p className="credit__remaining flex-items">
              {product.credit_remaining == null ? 0 : product.credit_remaining}
            </p>
            <button
              className="flex-items"
              onClick={() => setShowModal((prevValue) => !prevValue)}
              style={{
                border: "none",
                background: "transparent",
                color: "orange",
              }}
            >
              Grant Credit
            </button>
          </div>
        ))}
      </div>

      <div className={showModal ? "backdrop__container" : "close"}>
        <div className="modal__container">
          <div className="modal__header">
            <h3 style={{ fontWeight: "bold" }}>Enter Credit</h3>
          </div>

          <div className="modal__body">
            <form onSubmit={submitCredit} className="staff__modal">
              <input
                onChange={handleChange}
                type="number"
                name="opening_credit"
                value={updatedUser.opening_credit}
                placeholder="type here"
                className="modal__input"
                autoFocus
              />

              <div className="modal__buttons">
                <button
                  onClick={() => setShowModal((prevValue) => !prevValue)}
                  className="button"
                >
                  Save
                </button>
                <input
                  type="button"
                  value="Close"
                  onClick={() => setShowModal((prevValue) => !prevValue)}
                  className="close__button"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffCredit;
