import { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../../../context/AuthContext";
import TableContext from "../../../context/TableContext";
import { toast } from "react-toastify";
import {
  MdDeleteOutline,
  MdLocationOn,
  MdOutlineCreditCardOff,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import {
  FaMoneyBill,
  FaRegCreditCard,
  FaMinus,
  FaPhoneAlt,
} from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
import CashModal from "../payments/CashModal";
import PosModal from "../payments/posModal";
import CreditModal from "../payments/CreditModal";
import TransferModal from "../payments/TransferModal";
import { ComponentToPrint } from "../../print/ComponentToPrint";
import { useReactToPrint } from "react-to-print";
import DeleteSingleOrder from "./DeleteSingleOrder";
import "../Modal.css";
import Passcode from "../payments/Passcode";

export default function TableDetailsModal({ table, closeModal }) {
  const { user, orders, setOrders, getDetails, toastOptions, displayTables } =
    useContext(AuthContext);
  const {
    setAdminOrders,
    setBarmanOrders,
    getAdminDetails,
    barmanOrder,
    adminOrders,
    state: { changedOrders, barmanOrders },
    dispatch,
    getBarman,
  } = useContext(TableContext);
  const table_name = table?.table_name;

  useEffect(() => {
    localStorage.setItem("table", JSON.stringify(table));
  }, []);
  const activeUser = user.username;
  const activePasscode = user.passcode;
  const role = user.role;
  const [cashAmt, setCashAmt] = useState("");
  const [cashModal, showCashModal] = useState(false);

  const [posAmt, setPosAmt] = useState("");
  const [posModal, showPosModal] = useState(false);

  const [transferAmt, setTransferAmt] = useState("");
  const [transferModal, showTransferModal] = useState(false);

  const [creditAmt, setCreditAmt] = useState("");
  const [creditModal, showCreditModal] = useState(false);

  const [passcode, setPasscode] = useState(activePasscode);
  const [passcodeModal, showPasscodeModal] = useState(false);

  const totalPay = +cashAmt + +posAmt + +transferAmt + +creditAmt;

  const [compDrink, setCompDrink] = useState("");
  const [compQty, setCompQty] = useState(0);

  const [deleteOrder, setDelete] = useState(false);

  const closeDeleteModal = (e) => {
    if (e.target.id === "bg-delete") {
      setDelete(false);
    }
  };

  //CLOSING RECEIPT MODAL
  const closeModalAction = () => {
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
    } else if (user.role === "Bar Man") {
      setBarmanOrders([]);
      dispatch({
        type: "CLEAR_BARMANORDER",
      });
      localStorage.removeItem("table");
    } else {
      setOrders([]);
      localStorage.removeItem("table");
    }
  };

  //CLOSING PAYMENT MODAL
  const closePaymentModal = (e) => {
    if (e.target.id === "bg") {
      showCashModal(false);
      showPosModal(false);
      showTransferModal(false);
      showCreditModal(false);
      showPasscodeModal(false);
    }
  };

  //FETCHING DETAILS ON LOAD
  useEffect(() => {
    if (
      user.role === "Super Admin" ||
      user.role === "Administrator" ||
      user.role === "Store Manager"
    ) {
      getAdminDetails(activeUser, activePasscode, role, table_name);
    } else if (user.role === "Bar Man") {
      getBarman(activeUser, activePasscode, table_name);
    } else {
      getDetails(activeUser, activePasscode, table_name);
    }
  }, [activeUser, activePasscode, role, table_name]);

  // TOTALS
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const grandTotal = +total - +discount;

  //CALCULATING TOTALS
  useEffect(() => {
    if (
      user.role === "Super Admin" ||
      user.role === "Administrator" ||
      user.role === "Store Manager"
    ) {
      setTotal(
        adminOrders?.reduce(
          (acc, curr) => acc + Number(curr.item.price) * curr.quantity,
          0
        )
      );
    } else if (user.role === "Bar Man") {
      setTotal(
        barmanOrder?.reduce(
          (acc, curr) => acc + Number(curr.item.price) * curr.quantity,
          0
        )
      );
    } else {
      setTotal(
        orders?.reduce(
          (acc, curr) => acc + Number(curr.item.price) * curr.quantity,
          0
        )
      );
    }
  }, [orders, adminOrders, barmanOrder]);

  //Variables
  const complimentary_qty = compQty;
  const cash = +cashAmt;
  const pos = +posAmt;
  const transfer = +transferAmt;
  const credit = +creditAmt;
  const complimentary_drink = compDrink;

  const closeTableCall = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/close-table",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            complimentary_qty,
            credit,
            passcode,
            activeUser,
            table_name,
            cash,
            pos,
            transfer,
            total,
            complimentary_drink,
            discount,
          }),
        }
      );
      if (response.ok) {
        toast.success(`Table Closed`, toastOptions);
        if (user.role === "Bar Man") {
          closeModalAction();
          getBarman(activeUser, activePasscode, table_name);
          displayTables(activeUser);
        } else {
          closeModalAction();
          getDetails(activeUser, activePasscode, table_name);
          displayTables(activeUser);
        }
      } else {
        toast.error(`Could not close table`, toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const closeTable = () => {
    if (totalPay === grandTotal) {
      closeTableCall(
        complimentary_qty,
        credit,
        +passcode,
        activeUser,
        table_name,
        cash,
        pos,
        transfer,
        +grandTotal,
        complimentary_drink,
        discount
      );
    } else {
      toast.warn("Please enter the correct total amount", toastOptions);
    }
  };

  //UPDATE QUANTITY
  const updateQtyCall = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/apply-returns",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
            table_name,
            order: changedOrders,
          }),
        }
      );
      if (response.status === 200) {
        if (
          user.role === "Super Admin" ||
          user.role === "Administrator" ||
          user.role === "Store Manager"
        ) {
          getAdminDetails(activeUser, activePasscode, role, table_name);
          closeModalAction();
        } else if (user.role === "Bar Man") {
          getBarman(activeUser, activePasscode, table_name);
          closeModalAction();
        } else {
          getDetails(activeUser, activePasscode, table_name);
          closeModalAction();
        }
        toast.success("Quantity Updated", toastOptions);
      } else {
        toast.error("could not update quantity");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateQty = () => {
    updateQtyCall();
  };

  const updateQtyBarman = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/apply-returns",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
            table_name,
            order: barmanOrders,
          }),
        }
      );
      if (response.status === 200) {
        if (user.role === "Bar Man") {
          toast.success("Quantity Updated", toastOptions);
          closeModalAction();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateBarman = () => {
    updateQtyBarman();
  };

  //PRINTING
  const printRef = useRef();
  const handleReactToPrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };

  const currentDate = new Date();
  const date = `${currentDate.toLocaleString("en-US", {
    weekday: "long",
  })}, ${currentDate.toLocaleString("en-US", {
    month: "long",
  })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  const currentTime = new Date();
  const time = currentTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="table__receipt">
      <MdOutlineArrowBackIos size={30} onClick={closeModalAction} />
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
          {table.date ? table.date : date}
        </div>

        <div className="waiter">
          <div>
            <h4 style={{ display: "inline" }}>Time: </h4>
            <span>{table.time ? table.time : time}</span>
          </div>
        </div>
      </div>

      {(user.role === "Super Admin" ||
        user.role === "Administrator" ||
        user.role === "Store Manager") && (
        <table className="table">
          <thead>
            <tr className="table__header__row">
              <th className="th">Description</th>
              <th className="th">Price</th>
              <th className="th">Quantity</th>
              <th className="th">Subtotal</th>
              <th className="th"></th>
            </tr>
          </thead>
          {changedOrders.map((t, index, arr) => (
            <tr className="row__data" key={index}>
              <td className="td">{t.item.product}</td>
              <td className="td">₦{t.item.price}</td>
              <td className="td">
                {table.status === "OPEN" && (
                  <>
                    {(user.role === "Super Admin" ||
                      user.role === "Administrator") && (
                      <FaMinus
                        onClick={() => {
                          dispatch({
                            type: "DECREMENT_ORDER",
                            payload: t,
                          });
                        }}
                        size={15}
                        color="#080808"
                        className={
                          t.quantity === 1
                            ? "receiptQty_btn null"
                            : "receiptQty_btn"
                        }
                      />
                    )}
                  </>
                )}
                {t.quantity}
              </td>

              <td className="td">₦{t.quantity * t.item.price}</td>

              {/* //DELETE ITEM MODAL(ADMIN) */}
              {deleteOrder && (
                <div
                  className={deleteOrder ? "backdrop__container" : "close"}
                  id="bg-delete"
                  onClick={closeDeleteModal}
                >
                  <div>
                    <DeleteSingleOrder
                      order={t}
                      index={index}
                      arr={arr}
                      closeModal={closeDeleteModal}
                      table_name={table_name}
                    />
                  </div>
                </div>
              )}

              <td className="td">
                {table?.status === "CLOSED" ? undefined : (
                  <>
                    {(user.role === "Super Admin" ||
                      user.role === "Administrator") && (
                      <MdDeleteOutline
                        size={20}
                        style={{ marginTop: "2px" }}
                        color="red"
                        onClick={() => setDelete(true)}
                      />
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </table>
      )}

      {user.role === "Bar Man" ? (
        <table className="table">
          <thead>
            <tr className="table__header__row">
              <th className="th">Description</th>
              <th className="th">Price</th>
              <th className="th">Quantity</th>
              <th className="th">Subtotal</th>
              <th className="th"></th>
            </tr>
          </thead>
          {barmanOrders.map((tbar, index, arr) => (
            <tr className="row__data" key={index}>
              <td className="td">{tbar.item.product}</td>
              <td className="td">₦{tbar.item.price}</td>
              <td className="td">
                {table.status === "OPEN" && (
                  <>
                    {user.role === "Bar Man" && (
                      <FaMinus
                        onClick={() => {
                          dispatch({
                            type: "DECREMENT_BARMANORDER",
                            payload: tbar,
                          });
                        }}
                        size={15}
                        color="#080808"
                        className={
                          tbar.quantity === 1
                            ? "receiptQty_btn null"
                            : "receiptQty_btn"
                        }
                      />
                    )}
                  </>
                )}
                {tbar.quantity}
                {deleteOrder && (
                  <div
                    className={deleteOrder ? "backdrop__container" : "close"}
                    id="bg-delete"
                    onClick={closeDeleteModal}
                  >
                    <div>
                      <DeleteSingleOrder
                        order={tbar}
                        index={index}
                        arr={arr}
                        closeModal={closeDeleteModal}
                        table_name={table_name}
                      />
                    </div>
                  </div>
                )}
              </td>

              <td className="td">₦{tbar.quantity * tbar.item.price}</td>

              {/* //DELETE ITEM MODAL(BARMAN) */}

              <td className="td">
                {table?.status === "CLOSED" ? undefined : (
                  <>
                    <MdDeleteOutline
                      size={20}
                      style={{ marginTop: "2px" }}
                      color="red"
                      onClick={() => setDelete(true)}
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <>
          {user.role !== "Super Admin" &&
            user.role !== "Administrator" &&
            user.role !== "Store Manager" && (
              <table className="table">
                <thead>
                  <tr className="table__header__row">
                    <th className="th">Description</th>
                    <th className="th">Price</th>
                    <th className="th">Quantity</th>
                    <th className="th">Subtotal</th>
                    <th className="th"></th>
                  </tr>
                </thead>
                {orders.map((t, index) => (
                  <tr className="row__data" key={index}>
                    <td className="td">{t.item.product}</td>
                    <td className="td">₦{t.item.price}</td>
                    <td className="td">{t.quantity}</td>

                    <td className="td">₦{t.quantity * t.item.price}</td>

                    <td className="td"></td>
                  </tr>
                ))}
              </table>
            )}
        </>
      )}

      {table.status === "OPEN" && (
        <div>
          <>
            {(role === "Super Admin" || role === "Administrator") && (
              <button className="receipt__btn" onClick={updateQty}>
                apply changes
              </button>
            )}
            {role === "Bar Man" && (
              <button className="receipt__btn" onClick={updateBarman}>
                apply changes
              </button>
            )}
          </>
        </div>
      )}
      <div className="totals__data">
        <div>
          <span style={{ color: "blueviolet" }}>Total </span>{" "}
          <span style={{ color: "darkgreen" }}>₦{Math.round(total)}</span>
        </div>
        <div>
          <span>Discount </span>
          <span style={{ color: "red" }}>₦{Math.round(discount)}</span>
        </div>
        <div>
          <span style={{ color: "blueviolet" }}>GrandTotal </span>
          <span style={{ color: "darkgreen" }}>₦{Math.round(grandTotal)}</span>
        </div>
      </div>

      {table.status === "OPEN" &&
      user.role !== "Super Admin" &&
      user.role !== "Administrator" &&
      user.role !== "Store Manager" ? (
        <>
          <div className="payment__method">
            <p>Select a payment method</p>

            {/* PAYMENT MODALS CONDITIONAL RENDERING*/}
            {/* Cash */}
            {cashModal && (
              <div
                className={cashModal ? "backdrop__container" : "close"}
                id="bg"
                onClick={closePaymentModal}
              >
                <CashModal
                  cash={cashAmt}
                  setCash={setCashAmt}
                  closeModal={closePaymentModal}
                />
              </div>
            )}

            {/* pos */}
            {posModal && (
              <div
                className={posModal ? "backdrop__container" : "close"}
                id="bg"
                onClick={closePaymentModal}
              >
                <PosModal
                  cash={posAmt}
                  setCash={setPosAmt}
                  closeModal={closePaymentModal}
                />
              </div>
            )}

            {/* transfer */}
            {transferModal && (
              <div
                className={transferModal ? "backdrop__container" : "close"}
                id="bg"
                onClick={closePaymentModal}
              >
                <TransferModal
                  cash={transferAmt}
                  setCash={setTransferAmt}
                  closeModal={closePaymentModal}
                />
              </div>
            )}

            {/* credit */}
            {creditModal && (
              <div
                className={creditModal ? "backdrop__container" : "close"}
                id="bg"
                onClick={closePaymentModal}
              >
                <CreditModal
                  cash={creditAmt}
                  setCash={setCreditAmt}
                  closeModal={closePaymentModal}
                />
              </div>
            )}

            {/* passcode */}
            {passcodeModal && (
              <div
                className={passcodeModal ? "backdrop__container" : "close"}
                id="bg"
                onClick={closePaymentModal}
              >
                <Passcode
                  passcode={passcode}
                  setPasscode={setPasscode}
                  closeTable={closeTable}
                  closeModal={closePaymentModal}
                />
              </div>
            )}

            <div className="payment__options">
              <div className="cash">
                <span onClick={() => showCashModal(true)}>
                  <FaMoneyBill size={25} />
                </span>
                <span>{cashAmt !== "" ? `₦${cashAmt}` : "Cash"}</span>
              </div>

              <div className="pos">
                <span onClick={() => showPosModal(true)}>
                  <FaRegCreditCard size={25} />
                </span>
                <span>{posAmt !== "" ? `₦${posAmt}` : "POS"}</span>
              </div>

              <div className="transfer">
                <span onClick={() => showTransferModal(true)}>
                  <TbCurrencyNaira size={25} color="green" />
                </span>
                <span>
                  {transferAmt !== "" ? `₦${transferAmt}` : "Transfer"}
                </span>
              </div>

              <div className="credit">
                <span onClick={() => showCreditModal(true)}>
                  <MdOutlineCreditCardOff size={25} />
                </span>
                <span>{creditAmt !== "" ? `₦${creditAmt}` : "Credit"}</span>
              </div>

              <div id="totalAmt">
                <span>Total</span>
                <span>₦{totalPay}</span>
              </div>
            </div>
          </div>

          {user.role !== "Super Admin" &&
            user.role !== "Administrator" &&
            user.role !== "Store Manager" && (
              <>
                <button className="receipt__btn" onClick={handlePrint}>
                  Print Invoice
                </button>
                {user.role === "Bar Man" ? (
                  <div style={{ display: "none" }}>
                    <ComponentToPrint
                      table={table}
                      orders={barmanOrders}
                      ref={printRef}
                      total={total}
                      discont={discount}
                      grandTotal={grandTotal}
                    />
                  </div>
                ) : (
                  <div style={{ display: "none" }}>
                    <ComponentToPrint
                      table={table}
                      orders={orders}
                      ref={printRef}
                      total={total}
                      discont={discount}
                      grandTotal={grandTotal}
                    />
                  </div>
                )}
              </>
            )}

          <button className="receipt__btn" onClick={closeTable}>
            close table
          </button>
        </>
      ) : (
        <>
          {user.role !== "Super Admin" &&
            user.role !== "Administrator" &&
            user.role !== "Store Manager" && (
              <>
                <button className="receipt__btn" onClick={handlePrint}>
                  Print Receipt
                </button>
                {user.role === "Bar Man" ? (
                  <div style={{ display: "none" }}>
                    <ComponentToPrint
                      table={table}
                      orders={barmanOrders}
                      ref={printRef}
                      total={total}
                      discont={discount}
                      grandTotal={grandTotal}
                    />
                  </div>
                ) : (
                  <div style={{ display: "none" }}>
                    <ComponentToPrint
                      table={table}
                      orders={orders}
                      ref={printRef}
                      total={total}
                      discont={discount}
                      grandTotal={grandTotal}
                    />
                  </div>
                )}
              </>
            )}
        </>
      )}
    </div>
  );
}
