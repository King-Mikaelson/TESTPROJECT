import "./Category.css";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import EditPriceModal from "../modal/EditPriceModal";
import DeleteItemModal from "../modal/DeleteItemModal";

export default function UpdateSingleProduct({ item }) {
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const [deleteMode, setDeleteMode] = useState(false);
  const handleDelete = () => {
    setDeleteMode(true);
  };

  const closeModal = (e) => {
    if (e.target.id === "bg") {
      setEditMode(false);
      setDeleteMode(false);
    }
  };
  return (
    <div className="updateItem__wrapper">
      {editMode && (
        <div
          className={editMode ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <EditPriceModal item={item} closeModal={closeModal} />
          </div>
        </div>
      )}

      {deleteMode && (
        <div
          className={deleteMode ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <DeleteItemModal item={item} closeModal={closeModal} />
          </div>
        </div>
      )}

      <div className="update__item">
        <img
          src={item.image}
          alt={item.product}
          style={{ margin: "0.5rem 0rem" }}
          width={"35px"}
          height={"75px"}
        />
        <span>{item.product}</span>
        <span>₦{item.price}</span>
        <span>{item.department}</span>
        <span className="edit__price" onClick={handleEdit}>
          Edit Price
        </span>
        <span>
          <MdDeleteOutline
            size={25}
            className="delete__item"
            onClick={handleDelete}
          />
        </span>
      </div>
    </div>
  );
}
