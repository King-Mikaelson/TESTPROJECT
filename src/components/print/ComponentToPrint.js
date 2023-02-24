import React from "react";
import Orders from "../modal/updateOldTable/Orders";
import { MdLocationOn } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { orders, table, total, discount, grandTotal } = props;
  return (
    <div className="table__receipt" ref={ref} style={{ color: "black" }}>
      <h4>Table Bill: {table.table_name}</h4>
      <hr />
      <div className="company__wrapper">
        <div className="nav__logo--company">
          <img src="/logo.png" alt="" width={"100%"} />
        </div>
        <div className="company__details">
          <div className="contact">
            <MdLocationOn size={20} />
            <span>
              3D Igboeze Street, <br /> Independence Layout.
            </span>
          </div>{" "}
          <br />
          <div className="contact">
            <FaPhoneAlt />
            <span>09015290078</span>
          </div>
        </div>
      </div>
      <div className="waiter">
        <div>
          <h4 style={{ display: "inline" }}>Waiter's Name: </h4>
          {table.waiter}
        </div>

        <div>
          <h4 style={{ display: "inline" }}>Date: </h4>
          {table.date}
        </div>

        <div className="waiter">
          <div>
            <h4 style={{ display: "inline" }}>Time: </h4>
            <span>{table.time}</span>
          </div>
        </div>
      </div>
      <table style={{ color: "black", fontSize: "0.85rem" }}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        {orders.map((t, index) => (
          <Orders order={t} key={index} />
        ))}
      </table>

      <div className="totals__data">
        <div>
          <span style={{ color: "black" }}>Total </span>
          <span style={{ color: "black" }}>₦{Math.round(total)}</span>
        </div>
        <div>
          <span>Discount </span>
          <span style={{ color: "red" }}>₦{Math.round(discount)}</span>
        </div>
        <div>
          <span style={{ color: "black" }}>GrandTotal </span>
          <span style={{ color: "black" }}>₦{Math.round(grandTotal)}</span>
        </div>
      </div>
    </div>
  );
});
