import "./Login.css";
import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useTogglePassword from "../../hooks/useTogglePassword";
import { FaInfoCircle } from "react-icons/fa";

const Login = () => {
  const { loginUser, errMsg, setErrMsg, loading, setLoading } =
    useContext(AuthContext);
  const [InputType, ToggleIcon] = useTogglePassword();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");
    loginUser(username, password);
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        <div className="logo">
          <img src="/logo.png" alt="TheBase Logo" width={"100%"} />
        </div>
      </div>
      <h1 className="login-header">INTEGRATED POS/IMS MANAGEMENT SYSTEM</h1>
      <div className="form-container">
        {errMsg && (
          <p
            className="instructions"
            style={{ marginBottom: "1rem", fontSize: "0.8rem" }}
          >
            <FaInfoCircle />
            <span>{errMsg}</span>
          </p>
        )}
        <form onSubmit={login}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div style={{ position: "relative", marginTop: "2rem" }}>
            <input
              type={InputType}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="password-toggle-icon"> {ToggleIcon}</span>
          </div>

          {loading ? (
            <button id="login" className="login-button" disabled>
              <span>Please wait....</span>
            </button>
          ) : (
            <button id="login" className="login-button">
              <span>Login</span>
            </button>
          )}
        </form>
      </div>
      <div className="logo-2">
        <small
          style={{
            fontWeight: "600",
            textTransform: "uppercase",
            marginLeft: "-1.8rem",
          }}
        >
          powered by
        </small>
        <img src="/1.png" alt="Uppist Logo" width={"100px"} />
      </div>
    </div>
  );
};
export default Login;
