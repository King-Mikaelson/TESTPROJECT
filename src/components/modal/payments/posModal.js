import React from "react";
import "../Modal.css";

const PosModal = ({ cash, setCash, closeModal }) => {
  return (
    <div id="payments">
      <p>Enter Pos Amount:</p>
      <input
        type="number"
        value={cash}
        onChange={(e) => setCash(e.target.value)}
        autoFocus
      />
      <button id="bg" onClick={closeModal}>
        Enter
      </button>
    </div>
  );
};

export default PosModal;
