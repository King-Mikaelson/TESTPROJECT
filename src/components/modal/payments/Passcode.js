import React from "react";
import "../Modal.css";

const Passcode = ({ passcode, setPasscode, closeTable }) => {
  return (
    <div id="payments">
      <p>Enter Passcode:</p>
      <input
        type="number"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
        autoFocus
      />
      <button
        id="bg"
        onClick={() => {
          closeTable();
        }}
      >
        Enter
      </button>
    </div>
  );
};

export default Passcode;
