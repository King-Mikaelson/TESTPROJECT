import { AiFillCheckSquare, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import "./SingleTableDetails.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import TableContext from "../../context/TableContext";
import TableDetailsModal from "../modal/allTables/TableDetailsModal";
import "../modal/Modal.css";

const SingleTableDetail = ({ table }) => {
  const { tableOpen, user, setOrders } = useContext(AuthContext);
  const { setAdminOrders, dispatch } = useContext(TableContext);
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const handleDetails = () => {
    setShowDetails(!showDetails);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModalAction = (e) => {
    if (e.target.id === "bgs") {
      closeModal();
      if (
        user.role === "Super Admin" ||
        user.role === "Administrator" ||
        user.role === "Store Manager"
      ) {
        setAdminOrders([]);
        dispatch({
          type: "CLEAR_ORDER",
        });
        localStorage.removeItem("table");
      } else {
        setOrders([]);
        localStorage.removeItem("table");
      }
    }
  };
  return (
    <>
      {table.delete_status !== "TRUE" && (
        <>
          <div className="table__details">
            {showDetails && (
              <div
                className={showModal ? "backdrop__container" : "close"}
                onClick={closeModalAction}
                id="bgs"
              >
                <div className="modal__center tableDetails">
                  <TableDetailsModal table={table} closeModal={closeModal} />
                </div>
              </div>
            )}
            <p style={{ fontWeight: "600" }}>{table.table_name}</p>
            {table.status === "CLOSED" && (
              <AiFillCheckSquare color="green" size={20} />
            )}
            <span style={{ fontWeight: "600" }}>table</span>
            {tableOpen ? (
              <button className="tableDetails__btn" onClick={handleDetails}>
                <AiFillEye size={15} /> <span>view</span>
              </button>
            ) : (
              <button className="tableDetails__btn" disabled>
                <AiFillEye size={15} /> <span>view</span>
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SingleTableDetail;
