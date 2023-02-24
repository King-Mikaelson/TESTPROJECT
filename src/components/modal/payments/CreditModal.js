import React from "react";

const CreditModal = ({ cash, setCash, closeModal }) => {
  return (
    <div id="payments">
      <p>Enter Credit Amount:</p>
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

export default CreditModal;
