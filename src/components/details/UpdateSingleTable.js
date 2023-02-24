import { AiFillCheckSquare } from "react-icons/ai";
import { useState } from "react";
import "./SingleTableDetails.css";
import UpdateOrderTable from "../modal/updateOldTable/UpdateOrderTable";

const UpdateSingleTable = ({ table }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const handleDetails = () => {
    setShowDetails(!showDetails);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="table__details">
      {showDetails && (
        <div className={showModal ? "backdrop__container" : "close"}>
          <div className="modal__center tableDetails">
            <UpdateOrderTable table={table} closeModal={closeModal} />
          </div>
        </div>
      )}
      <p style={{ fontWeight: "600" }}>{table.table_name}</p>
      {table.status === "CLOSED" && (
        <AiFillCheckSquare color="green" size={20} />
      )}
      <span style={{ fontWeight: "600" }}>table</span>
      {table.status === "CLOSED" ? (
        <button className="tableDetails__btn" disabled>
          <span style={{ fontSize: "0.8rem" }}>Add</span>
        </button>
      ) : (
        <button className="tableDetails__btn" onClick={handleDetails}>
          <span style={{ fontSize: "0.8rem" }}>+ Add</span>
        </button>
      )}
    </div>
  );
};

export default UpdateSingleTable;
