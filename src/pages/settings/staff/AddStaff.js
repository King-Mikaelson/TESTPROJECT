import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import "../Settings.css";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
import { MdOutlineArrowBackIos } from "react-icons/md";

const AddStaff = () => {
  const navigate = useNavigate();
  const { toastOptions } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    selectRole: "",
    passcode: 0,
  });

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const addUser = async (username, password, role, passcode) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/new-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            role,
            passcode,
          }),
        }
      );
      if (response.status === 200) {
        toast("New User added successfully", toastOptions);
        setLoading(false);
      }
    } catch (err) {
      toast("User not added", toastOptions);
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    if (newUser.username === "" || newUser.selectRole === "") {
      toast("Please enter all fields", toastOptions);
    } else {
      setLoading(true);
      addUser(
        newUser.username,
        newUser.password,
        newUser.selectRole,
        +newUser.passcode
      );
    }

    setNewUser({ username: "", password: "", selectRole: "", passcode: "" });
  };

  return (
    <div className="form__wrapper">
      <div style={{ margin: "0" }} className="add__header">
        <div className="back__button" onClick={() => navigate(-1)}>
          <MdOutlineArrowBackIos size={22} />
          <p className="goback__text">Go Back</p>
        </div>
        <h1 className="page__name">Staff Manager</h1>
      </div>

      <hr />
      <p style={{ padding: "1rem 0", fontSize: "1rem" }}>
        Manage your staff and account permissions here{" "}
      </p>
      <p style={{ padding: "0rem 0", fontSize: "1rem" }}>Add a new user</p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Enter Staff Username"
            onChange={handleChange}
            value={newUser.username}
            autoFocus
          />
          <label htmlFor="input" className="control-label">
            Staff Username
          </label>
        </div>

        <div className="input-wrapper">
          <select
            className="form-control"
            onChange={handleChange}
            value={newUser.selectRole}
            name="selectRole"
            required
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
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Staff Password"
            onChange={handleChange}
            value={newUser.password}
            required
          />
          <label htmlFor="input" className="control-label">
            Enter Staff Password
          </label>
        </div>

        <div className="input-wrapper">
          <input
            type="number"
            name="passcode"
            className="form-control"
            placeholder="Enter Unique Pass Code"
            onChange={handleChange}
            value={newUser.passcode}
            required
          />
          <label htmlFor="input" className="control-label">
            Enter Unique Pass Code
          </label>
        </div>

        <button style={{ borderRadius: "5px" }}>
          {loading ? "Adding Staff..." : "Add Staff"}
        </button>
      </form>
    </div>
  );
};

export default AddStaff;
