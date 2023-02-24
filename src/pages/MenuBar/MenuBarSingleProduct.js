import React from "react";
import { useState } from "react";
import { GiWineBottle } from "react-icons/gi";
import { IoIosRestaurant } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import EditPriceModal from "../../components/modal/EditPriceModal";
import DeleteItemModal from "../../components/modal/DeleteItemModal";
import "../../components/modal/Modal.css";

const MenuBarSingleproduct = ({ items }) => {
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
    <div className="menu-item">
      {editMode && (
        <div
          className={editMode ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <EditPriceModal
              item={items}
              setEditMode={setEditMode}
              closeModal={closeModal}
            />
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
            <DeleteItemModal
              item={items}
              setDeleteMode={setDeleteMode}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
      <div style={{ textAlign: "center", position: "relative" }}>
        {(items.category === "Beers" ||
          items.category === "Soft Drinks" ||
          items.category === "Wines" ||
          items.category === "Energy drink") && (
          <p
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              position: "absolute",
              left: "0",
              top: "0%",
              transform: "translateY(-0%)",
            }}
          >
            {items.quantity}
          </p>
        )}
        <p style={{ fontSize: "1rem", padding: "0 50px" }}>
          {items.department}
        </p>

        {items.category === "Beers" ||
        items.category === "Soft Drinks" ||
        items.category === "Wines" ||
        items.category === "Energy drink" ? (
          <div className="menu-img">
            <GiWineBottle size={25} color="white" />
          </div>
        ) : (
          <div className="menu-img">
            <IoIosRestaurant size={25} color="white" />
          </div>
        )}
      </div>

      <div className="item-info">
        <header>
          <h2>{items.product}</h2>
          <h3 className="price">₦{items.price}</h3>
        </header>
      </div>
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <button
          className="edit__price"
          onClick={handleEdit}
          style={{
            border: "none",
            borderRight: "1px solid black",
            borderRadius: "none",
          }}
        >
          <BsPencilSquare size={23} color="red" />
        </button>

        <button
          className="delete__item"
          onClick={handleDelete}
          style={{ border: "none" }}
        >
          <MdDeleteOutline size={23} color="red" />
        </button>
      </div>
    </div>
  );
};

export default MenuBarSingleproduct;
