import { useContext, useState, useEffect } from "react";
import {
  MdRestaurantMenu,
  MdOutlineCreditCardOff,
  MdDeleteOutline,
} from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import { Link } from "react-router-dom";
import CashModal from "../modal/payments/CashModal";
import PosModal from "../modal/payments/posModal";
import TransferModal from "../modal/payments/TransferModal";
import CreditModal from "../modal/payments/CreditModal";
import AuthContext from "../../context/AuthContext";
import Company from "../company/Company";
import OrdertableModal from "../modal/OrdertableModal";
import {
  FaMinus,
  FaPlus,
  FaMoneyBill,
  FaRegCreditCard,
  FaTimes,
} from "react-icons/fa";
import "./Cart.css";

const Cart = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    state: { cart },
    dispatch,
    showCartMenu,
    toggleCartMenu,
    toggleSideBar,
  } = useContext(AuthContext);
  const [totalCart, setTotalCart] = useState();

  useEffect(() => {
    setTotalCart(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.quantity, 0)
    );
  }, [cart]);
  const menuAction = () => {
    toggleSideBar(false);
    toggleCartMenu(false);
  };

  //PAYMENTS
  const [cashAmt, setCashAmt] = useState("");
  const [cashModal, showCashModal] = useState(false);

  const [posAmt, setPosAmt] = useState("");
  const [posModal, showPosModal] = useState(false);

  const [transferAmt, setTransferAmt] = useState("");
  const [transferModal, showTransferModal] = useState(false);

  const [creditAmt, setCreditAmt] = useState("");
  const [creditModal, showCreditModal] = useState(false);

  const totalPay = +cashAmt + +posAmt + +transferAmt + +creditAmt;

  //CLOSING PAYMENT MODAL
  const closePaymentModal = (e) => {
    if (e.target.id === "bg") {
      showCashModal(false);
      showPosModal(false);
      showTransferModal(false);
      showCreditModal(false);
    }
  };

  // TOTALS
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const grandTotal = +total - +discount;

  return (
    <>
      {showModal && (
        <OrdertableModal
          span={
            <FaTimes
              className="close__order"
              size={25}
              onClick={() => setShowModal(!showModal)}
            />
          }
          paragraph="Choose where to place order"
          text={<Link to="/orders/newtable">New Table</Link>}
          options={<Link to="/updateorder">Old Table</Link>}
        />
      )}

      {/* PAYMENT MODALS CONDITIONAL RENDERING */}
      {/* Cash */}
      {/* {cashModal && (
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
      )} */}

      {/* pos */}
      {/* {posModal && (
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
      )} */}

      {/* transfer */}
      {/* {transferModal && (
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
      )} */}

      {/* credit */}
      {/* {creditModal && (
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
      )}  */}

      <div className="cart__wrapper">
        <div
          className="cart__header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h3>New Order Bill</h3>
          <div className={showCartMenu ? "position" : "no-display"}>
            <FaTimes size={25} onClick={menuAction} />
          </div>
        </div>

        <Company />
        {cart.length === 0 && <p>No Orders Yet.</p>}

        {cart.length > 0 && (
          <>
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
              {cart.map((item, index) => (
                <tr key={index}>
                  <td className="td">
                    {item.product} ({item.department})
                  </td>
                  <td className="td">₦{item.price}</td>
                  <td className="td minus__plus__button">
                    <FaMinus
                      onClick={() => {
                        dispatch({
                          type: "DECREMENT_QTY",
                          payload: item,
                        });
                      }}
                      size={18}
                      color="blue"
                      className="minus__order"
                    />

                    <span style={{ margin: "0 0.5rem", fontSize: "1.5rem" }}>
                      {item.quantity}
                    </span>
                    <FaPlus
                      onClick={() => {
                        dispatch({
                          type: "INCREMENT_QTY",
                          payload: item,
                        });
                      }}
                      size={18}
                      color="white"
                      className={
                        item.quantity === item.qty
                          ? "plus__order null"
                          : "plus__order"
                      }
                    />
                  </td>
                  <td className="td">
                    ₦{item.quantity * Math.round(item.price)}
                  </td>
                  <td className="td">
                    <MdDeleteOutline
                      size={20}
                      color="red"
                      style={{ marginTop: "2px" }}
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: item,
                        });
                      }}
                    />
                  </td>
                </tr>
              ))}
            </table>
            <div className="place__order">
              <strong className="grand__total">
                <span>Grand Total:</span>

                <span className="grand__totalnumber">
                  ₦{Math.round(totalCart)}
                </span>
              </strong>
              <div onClick={() => setShowModal(!showModal)} className="order">
                <span className="filter__bar">
                  <MdRestaurantMenu
                    className="filter__icons"
                    style={{ backgroundColor: "transparent", color: "inherit" }}
                    size={25}
                  />
                  Place Order
                </span>
              </div>
            </div>
          </>
        )}

        {/* <div className="payment__method">
          <p>Select a payment method</p>

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
              <span>{transferAmt !== "" ? `₦${transferAmt}` : "Transfer"}</span>
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
        <div
          className="order"
          style={{ padding: "1rem", backgroundColor: "var(--orange)" }}
        >
          <span className="filter__bar">Pay</span>
        </div>
       */}
      </div>
    </>
  );
};

export default Cart;
