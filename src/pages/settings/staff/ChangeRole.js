import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../Settings.css";
import { useState, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { MdOutlineArrowBackIos } from "react-icons/md";

const ChangeRole = () => {
  const { user, toastOptions } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showRole, setShowRole] = useState(false);
  const [users, setUsers] = useState([
    {
      username: "MIKE",
      role: "Super Admin",
      status: "ACTIVE",
    },
  ]);

  const changeRoleModal = () => {
    setShowRole((prevValue) => !prevValue);
  };

  const url = `https://swift-lounge.onrender.com/users`;
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

  // A FUNCTION TO GET THE NEW ROLE OF THE USER
  const handleChange = (event) => {
    setUpdatedUser({ ...updatedUser, role: event.target.value });
  };

  // A STATE THAT HOLDS THE UPDATED DETAILS OF ADMIN AND USER THAT IS CHANGED
  const [updatedUser, setUpdatedUser] = useState({
    activeUser: user.username,
    activePasscode: user.passcode,
    username: "",
    role: "",
  });

  // A FUNCTION TO GET THE USERNAME OF ROLE CHANGED
  const updateUserDetails = (product) => {
    setUpdatedUser({ ...updatedUser, username: product.username });
  };

  // FUNCTION TO UPDATE THE ROLE OF THE USER
  const updateUser = async (activeUser, activePasscode, username, role) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/update-role",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
            username,
            role,
          }),
        }
      );
      if (response.status === 200) {
        toast("User role changed successfully", toastOptions);
        getAllUsers();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    updateUser(
      updatedUser.activeUser,
      updatedUser.activePasscode,
      updatedUser.username,
      updatedUser.role
    );
    setUpdatedUser({ ...updatedUser, username: "", role: "" });
  };

  return (
    <>
      <div className="form__wrapper">
        <div className="add__header">
          <div className="back__button" onClick={() => navigate(-1)}>
            <MdOutlineArrowBackIos size={25} />
            <p className="goback__text">Go Back</p>
          </div>
          <h1 className="page__name">Change Role</h1>
        </div>
        <hr />

        <div className="products__wrapper">
          {users.length > 1 &&
            users.map((product) => (
              <div
                onClick={() => {
                  changeRoleModal();
                  updateUserDetails(product);
                }}
                key={product.username}
                className="staff__wrapper"
              >
                <p className="flex-items">{product.username}</p>
                <p
                  style={{ color: "blue", textAlign: "center" }}
                  className="staff__name flex-items"
                >
                  {product.role}{" "}
                </p>
                <p className="staff__category flex-items">{product.status} </p>
              </div>
            ))}
        </div>
      </div>

      <div className={showRole ? "backdrop__container" : "close"}>
        <div className="modal__container">
          <div className="modal__header">
            <h3 style={{ fontWeight: "bold" }}>Select New Role Staff </h3>
          </div>

          <div className="modal__body">
            <form onSubmit={handleSubmit} className="staff__modal">
              <select
                className="modal__input"
                onChange={handleChange}
                value={updatedUser.role}
              >
                <option value="" hidden className="placeholderSelect">
                  Select Role
                </option>
                <option value="Super Admin">Super Admin</option>
                <option value="Administrator">Administrator</option>
                <option value="Store Manager">Store Manager</option>
                <option value="Accountant">Accountant</option>
                <option value="Cashier">Cashier</option>
              </select>

              <div className="modal__buttons">
                <button onClick={changeRoleModal} className="button">
                  Save
                </button>
                <input
                  type="button"
                  value="Close"
                  onClick={changeRoleModal}
                  className="close__button"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeRole;
