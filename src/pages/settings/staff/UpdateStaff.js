import { useNavigate } from "react-router-dom";
import "../Settings.css";
import { MdOutlineDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { MdOutlineArrowBackIos } from "react-icons/md";

const UpdateStaff = () => {
  const navigate = useNavigate();
  const { user, toastOptions } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [suspendAccount, setSuspendAccount] = useState(false);
  const [reactivateAccount, setReactivateAccount] = useState(false);

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "C.C",
      role: "Super Admin",
      status: "ACTIVE",
    },
  ]);

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
  useEffect(() => {
    getAllUsers();
  }, []);

  // A FUNCTION TO GET THE NEW ROLE OF THE USER
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
    password: "",
    passcode: "",
  });

  // FUNCTION TO UPDATE THE PASSWORD OF THE USER
  const updatePassword = async (
    activeUser,
    activePasscode,
    username,
    password
  ) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/update-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
            username,
            password,
          }),
        }
      );

      if (response.status === 200) {
        toast("User password changed successfully", toastOptions);
        getAllUsers();
      }
    } catch (err) {
      toast("User password not changed", toastOptions);
    }
  };

  // FUNCTION TO UPDATE THE PASSCODE OF THE USER
  const updatePasscode = async (
    activeUser,
    activePasscode,
    username,
    passcode
  ) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/update-passcode",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
            username,
            passcode,
          }),
        }
      );
      if (response.status === 200) {
        toast("User passcode changed successfully", toastOptions);
        getAllUsers();
      }
    } catch (err) {
      toast("User passcode not changed", toastOptions);
    }
  };

  // FUNCTION TO DELETE USER
  const deleteUser = async (activeUser, activePasscode, username) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/delete-user",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
            username,
          }),
        }
      );

      if (response.status === 200) {
        toast("User deleted successfully", toastOptions);
        getAllUsers();
      }
    } catch (err) {
      toast("User not deleted", toastOptions);
    }
  };

  // FUNCTION TO SUSPEND  USER
  const suspendUser = async (activeUser, activePasscode, username) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/suspend-user",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
            username,
          }),
        }
      );

      if (response.status === 200) {
        toast("User suspended successfully", toastOptions);
        getAllUsers();
      }
    } catch (err) {
      toast("User not suspended", toastOptions);
    }
  };

  // FUNCTION TO REACTIVATE  USER
  const reactivateUser = async (activeUser, activePasscode, username) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/reactivate",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
            username,
          }),
        }
      );

      if (response.status === 200) {
        toast.success("Suspended User Reactivated successfully", toastOptions);
        getAllUsers();
      }
    } catch (err) {
      toast.warn("Suspended User Was Not Reactivated", toastOptions);
      console.log(err);
    }
  };

  const submitPassword = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    updatePassword(
      updatedUser.activeUser,
      updatedUser.activePasscode,
      updatedUser.username,
      updatedUser.password
    );
    setUpdatedUser({
      ...updatedUser,
      username: "",
      passcode: "",
      password: "",
    });
    getAllUsers();
  };

  const submitPasscode = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    updatePasscode(
      updatedUser.activeUser,
      updatedUser.activePasscode,
      updatedUser.username,
      updatedUser.passcode
    );
    setUpdatedUser({
      ...updatedUser,
      username: "",
      password: "",
      passcode: "",
    });
  };

  const removeUser = (event) => {
    event.preventDefault();
    deleteUser(
      updatedUser.activeUser,
      updatedUser.activePasscode,
      updatedUser.username
    );
  };

  const userSuspended = (event) => {
    event.preventDefault();
    suspendUser(
      updatedUser.activeUser,
      updatedUser.activePasscode,
      updatedUser.username
    );
  };

  const userReactivated = (event) => {
    event.preventDefault();
    reactivateUser(
      updatedUser.activeUser,
      updatedUser.activePasscode,
      updatedUser.username
    );
  };

  const closeModal = (e) => {
    if (e.target.className === "backdrop__container") {
      setDeleteAccount(false);
      setShowPasscode(false);
      setShowModal(false);
      setReactivateAccount(false);
      setSuspendAccount(false);
    }
  };

  return (
    <div className="form__wrapper">
      <div className="add__header">
        <div className="back__button" onClick={() => navigate(-1)}>
          <MdOutlineArrowBackIos size={25} />
          <p className="goback__text">Go Back</p>
        </div>
        <h1 className="page__name">Update Staff</h1>
      </div>
      <hr />
      <div className="staff__name" style={{ display: "flex" }}>
        <p className="flex-items">Username</p>
        <p className="flex-items">Role</p>
        <p className="flex-items">Status</p>
        <p className="flex-items">Suspend</p>
        <p className="flex-items">Edit Password</p>
        <p className="flex-items">Edit Passcode</p>
        <p className="flex-items">Delete</p>
      </div>
      <div className="products__wrapper">
        {users.map((product) => (
          <div
            onClick={() => {
              updateUserDetails(product);
            }}
            key={product.username}
            className="staff__wrapper"
          >
            <p className="flex-items">{product.username}</p>
            <p className="staff__name flex-items">{product.role} </p>
            <p className="staff__category flex-items">{product.status} </p>
            <button
              onClick={() =>
                product.status.toLowerCase() === "susPenDeD".toLowerCase()
                  ? setReactivateAccount((prevValue) => !prevValue)
                  : setSuspendAccount((prevValue) => !prevValue)
              }
              className="flex-items"
            >
              {product.status.toLowerCase() === "susPenDeD".toLowerCase()
                ? "Reactivate"
                : "Suspend"}
            </button>
            <button
              onClick={() => setShowModal((prevValue) => !prevValue)}
              className="flex-items"
            >
              Edit Password
            </button>
            <button
              onClick={() => setShowPasscode((prevValue) => !prevValue)}
              className="flex-items"
            >
              Edit Passcode
            </button>

            <button
              onClick={() => setDeleteAccount((prevValue) => !prevValue)}
              className="flex-items"
            >
              <MdOutlineDelete style={{ fill: "red" }} size={20} />
            </button>
          </div>
        ))}
      </div>

      <div
        onClick={closeModal}
        className={showModal ? "backdrop__container" : "close"}
      >
        <div className="modal__container">
          <div className="modal__header">
            <h3 style={{ fontWeight: "bold" }}>Enter Password</h3>
          </div>

          <div className="modal__body">
            <form onSubmit={submitPassword} className="staff__modal">
              <input
                onChange={handleChange}
                type="text"
                name="password"
                value={updatedUser.password}
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

      <div
        onClick={closeModal}
        className={showPasscode ? "backdrop__container" : "close"}
      >
        <div className="modal__container">
          <div className="modal__header">
            <h3 style={{ fontWeight: "bold" }}>Enter Passcode</h3>
          </div>

          <div className="modal__body">
            <form onSubmit={submitPasscode} className="staff__modal">
              <input
                onChange={handleChange}
                name="passcode"
                value={updatedUser.passcode}
                type="text"
                placeholder="type here"
                className="modal__input"
                autoFocus
              />

              <div className="modal__buttons">
                <button
                  onClick={() => setShowPasscode((prevValue) => !prevValue)}
                  className="button"
                >
                  Save
                </button>
                <input
                  type="button"
                  value="Close"
                  onClick={() => setShowPasscode((prevValue) => !prevValue)}
                  className="close__button"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        onClick={closeModal}
        className={deleteAccount ? "backdrop__container" : "close"}
      >
        <div className="modal__container">
          <div className="modal__header">
            <p style={{ fontSize: "1.5rem" }}>
              Confirm Delete User:{" "}
              <span style={{ fontWeight: "bold" }}>{updatedUser.username}</span>
            </p>
          </div>

          <div className="modal__body">
            <form onSubmit={removeUser} className="staff__modal">
              <div className="modal__buttons">
                <button
                  onClick={() => setDeleteAccount((prevValue) => !prevValue)}
                  className="button"
                >
                  Delete
                </button>
                <input
                  type="button"
                  value="Close"
                  onClick={() => setDeleteAccount((prevValue) => !prevValue)}
                  className="close__button"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        onClick={closeModal}
        className={suspendAccount ? "backdrop__container" : "close"}
      >
        <div className="modal__container">
          <div className="modal__header">
            <p style={{ fontSize: "1.5rem" }}>
              Confirm Suspend User:{" "}
              <span style={{ fontWeight: "bold" }}>{updatedUser.username}</span>
            </p>
          </div>

          <div className="modal__body">
            <form onSubmit={userSuspended} className="staff__modal">
              <div className="modal__buttons">
                <button
                  onClick={() => setSuspendAccount((prevValue) => !prevValue)}
                  className="button"
                >
                  Suspend
                </button>
                <input
                  type="button"
                  value="Close"
                  onClick={() => setSuspendAccount((prevValue) => !prevValue)}
                  className="close__button"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        onClick={closeModal}
        className={reactivateAccount ? "backdrop__container" : "close"}
      >
        <div className="modal__container">
          <div className="modal__header">
            <p style={{ fontSize: "1.5rem" }}>
              Confirm Reactivate User:{" "}
              <span style={{ fontWeight: "bold" }}>{updatedUser.username}</span>
            </p>
          </div>

          <div className="modal__body">
            <form onSubmit={userReactivated} className="staff__modal">
              <div className="modal__buttons">
                <button
                  onClick={() =>
                    setReactivateAccount((prevValue) => !prevValue)
                  }
                  className="button"
                >
                  Reactivate
                </button>
                <input
                  type="button"
                  value="Close"
                  onClick={() =>
                    setReactivateAccount((prevValue) => !prevValue)
                  }
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

export default UpdateStaff;
