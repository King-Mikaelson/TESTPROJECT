import { useState } from "react";
import "./Inventory.css";
import { AiFillEdit } from "react-icons/ai";
import UpdateAllItemsQty from "./modals/UpdateAllItemsQty";
import ReorderQty from "./modals/ReorderQty";
import Transactions from "./Transactions";
import DeleteItem from "./modals/DeleteItem";
import AdminModal from "./modals/AdminModal";

const MobileView = ({ order, index }) => {
  const [updateQuantity, setUpdateQuantity] = useState(false);
  const [reorderQuantity, setReorderQuantity] = useState(false);
  const [send, setSend] = useState(false);
  const [deleteItem, setDelete] = useState(false);
  const [adminModal, showAdminModal] = useState(false);

  const closeModal = (e) => {
    if (e.target.id === "bg") {
      setUpdateQuantity(false);
      setSend(false);
      setReorderQuantity(false);
      setDelete(false);
    }
  };

  const closeAdminModal = (e) => {
    if (e.target.id === "bg") {
      showAdminModal(false);
      setUpdateQuantity(false);
      setSend(false);
      setReorderQuantity(false);
      setDelete(false);
    }
  };

  const closeOneModal = () => {
    showAdminModal(false);
  };

  const closeAll = () => {
    showAdminModal(false);
    setUpdateQuantity(false);
    setSend(false);
    setReorderQuantity(false);
    setDelete(false);
  };

  const { size, metric, product, quantity, reorder } = order;

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
        <tr>
          <th>Quantity</th>
          <td>
            {quantity}
            <AiFillEdit
              color="var(--success)"
              size={15}
              className="edit__qty"
              onClick={() => {
                showAdminModal(true);
                setUpdateQuantity(true);
              }}
            />
          </td>
        </tr>
        <tr>
          <th>Size</th>
          <td>
            {size}
            {metric}
          </td>
        </tr>
        <tr>
          <th>MSL</th>
          <td>
            {reorder}
            <AiFillEdit
              color="var(--success)"
              size={15}
              className="edit__qty"
              onClick={() => {
                showAdminModal(true);
                setReorderQuantity(true);
              }}
            />
          </td>
        </tr>
        <tr>
          <th>Status</th>
          <td>
            {quantity === 0 && (
              <span className="ims--outOfStock">Out of stock</span>
            )}
            {quantity < reorder && quantity !== 0 && (
              <span className="ims--lowStock">low stock</span>
            )}
            {quantity > reorder && (
              <span className="ims--inStock">In stock</span>
            )}
          </td>
        </tr>
        <tr>
          <th>Action</th>
          <td
            className="ims__send"
            onClick={() => {
              showAdminModal(true);
              setSend(true);
            }}
          >
            Send
          </td>
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

      {/* update all items quantity */}
      {updateQuantity && (
        <div
          className={updateQuantity ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <UpdateAllItemsQty order={order} closeModal={closeModal} />
          </div>
        </div>
      )}

      {/* send to department */}
      {send && (
        <div
          className={send ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <Transactions order={order} closeModal={closeModal} />
          </div>
        </div>
      )}

      {/* update reorder quantity */}
      {reorderQuantity && (
        <div
          className={reorderQuantity ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <ReorderQty order={order} closeModal={closeModal} />
          </div>
        </div>
      )}

      {/* delete item */}
      {deleteItem && (
        <div
          className={deleteItem ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <DeleteItem order={order} closeModal={closeModal} />
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

export default MobileView;
