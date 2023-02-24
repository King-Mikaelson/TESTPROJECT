import React from "react";

const TransferModal = ({ cash, setCash, closeModal }) => {
  return (
    <div id="payments">
      <p>Enter Transfer Amount:</p>
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

export default TransferModal;
