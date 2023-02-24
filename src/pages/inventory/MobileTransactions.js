import { useState, useContext } from "react";
import "./Inventory.css";
import TableContext from "../../context/TableContext";
import DeleteTransaction from "./modals/DeleteTransactions";
import AdminModal from "./modals/AdminModal";

const MobileTransactions = ({ order, index }) => {
  const { date, department, product, quantity, description, portion, size } =
    order;
  const { activeDept } = useContext(TableContext);
  const formattedDate = date?.substring(0, 10);
  const [adminModal, showAdminModal] = useState(false);
  const [deleteItem, setDelete] = useState(false);

  const closeModal = (e) => {
    if (e.target.id === "bg") {
      setDelete(false);
    }
  };

  const closeAdminModal = (e) => {
    if (e.target.id === "bg") {
      showAdminModal(false);
      setDelete(false);
    }
  };

  const closeOneModal = () => {
    showAdminModal(false);
  };

  const closeAll = () => {
    showAdminModal(false);
    setDelete(false);
  };
  return (
    <>
      <table className="imsMobileTable">
        <tr className="imsTr">
          <th>No</th>
          <td>{index + 1}</td>
        </tr>
        <tr>
          <th>Item Names</th>
          <td>{product}</td>
        </tr>

        {activeDept === "Kitchen" && (
          <tr>
            <th>Description</th>
            <td>{description}</td>
          </tr>
        )}
        <tr>
          <th>Quantity</th>
          {activeDept === "Kitchen" ? (
            <td>
              {quantity}({size})
            </td>
          ) : (
            <td>{quantity}</td>
          )}
        </tr>
        {activeDept === "Kitchen" && (
          <tr>
            <th>Portion</th>
            <td>{portion}</td>
          </tr>
        )}
        <tr>
          <th>Department</th>
          <td>{department}</td>
        </tr>
        <tr>
          <th>Date</th>
          <td>{formattedDate}</td>
        </tr>
      </table>
      <section
        className="ims__delete"
        style={{
          marginBottom: "3rem",
          fontWeight: "700",
          textDecoration: "underline",
          marginTop: "0.2rem",
        }}
        onClick={() => {
          showAdminModal(true);
          setDelete(true);
        }}
      >
        Delete Item
      </section>

      {/* delete transaction */}
      {deleteItem && (
        <div
          className={deleteItem ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <DeleteTransaction order={order} closeModal={closeModal} />
          </div>
        </div>
      )}

      {/* admin modal */}
      {adminModal && (
        <div
          className={adminModal ? "backdrop__container" : "close"}
          id="bg"
          onClick={(e) => {
            closeAdminModal(e);
          }}
        >
          <div>
            <AdminModal
              order={order}
              closeModal={closeModal}
              closeAdminModal={closeOneModal}
              closeAll={closeAll}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileTransactions;
