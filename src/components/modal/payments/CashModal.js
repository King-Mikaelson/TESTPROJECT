import React from "react";
import "../Modal.css";

const CashModal = ({ cash, setCash, closeModal }) => {
  return (
    <div id="payments">
      <p>Enter Cash Price:</p>
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

export default CashModal;
