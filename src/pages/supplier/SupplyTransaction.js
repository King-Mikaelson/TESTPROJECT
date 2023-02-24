import React from 'react'
import {useNavigate} from "react-router-dom";
import {  BsPlusCircle } from "react-icons/bs";
import {useState} from "react"
import {useContext} from "react"
import TableContext from "../../context/TableContext";
import ReceivedOrder from './modals/ReceivedOrder';
import CancelOrder from './modals/CancelOrder';
import { FaCaretDown} from "react-icons/fa";




function SupplyTransaction() {
    const navigate = useNavigate();
    const[fromDate, setFromDate] = useState("");
    const[toDate, setToDate] = useState("")
    const {activePage, setActivePage} = useContext(TableContext)


    const [receive, setReceive] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [newselection, setNewSelection] = useState("");
    const [action, setAction] = useState(false);
    // const [products, setProducts] = useState([
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   },
    //   {
    //     no: "1",
    //     name: "Wine",
    //     quantity: "10",
    //     size:"1L",
    //     unit:"10000",
    //     total:"100000",
    //     date:"12/12/2021",
    //   }
    // ]);


    const handleChange = (event) => {
      let newAction = 
      setNewSelection(event.target.value);
    };

    console.log(newselection)
  

  
    const closeModal = (e) => {
      if (e.target.id === "bg") {
        setReceive(false);
        setCancel(false);
      }
    };

    const products = [
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        },
        {
          no: "1",
          name: "Wine",
          quantity: "10",
          size:"1L",
          unit:"10000",
          total:"100000",
          date:"12/12/2021",
        }
      ]



  return (
    <>

    {receive && (
        <div
          className={receive ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <ReceivedOrder receive={receive} closeModal={closeModal} />
          </div>
        </div>
      )}

      {cancel && (
        <div
          className={cancel ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <CancelOrder cancel ={cancel} closeModal={closeModal} />
          </div>
        </div>
      )}
    <div className="user__details">
      <div className='user__dashboard__header'>


        { activePage === "PLACED ORDERS"  ? 
            <div
        className="user__details__order"
        onClick={() => {  navigate(`/supplier/${1}/supplyorder`)} }
          >
            <div  className="order__badge3">
            <span>
              <BsPlusCircle size={20} />
            </span>
            <span>Place Orders</span> 
            </div>
            
          </div> 
          : activePage === "RECEIVED ORDERS"  ? 
          <div
        className="user__details__order"
        onClick={() => {  navigate(`/supplier/${1}/receivesupply`)} }
          >

            <div  className="order__badge3">
            <span>
              <BsPlusCircle size={20} />
            </span>
            <span>Receive Orders</span> 
            </div>
          </div> : 
          activePage === "CANCELED ORDERS"  ? 
          <div
        className="user__details__order"
        onClick={() => {  navigate(`/supplier/${1}/cancelsupply`)} }
          >
            <div  className="order__badge3">
            <span>
              <BsPlusCircle size={20} />
            </span>
            <span>Cancel Orders</span> 
            </div>
          </div> : 
          activePage === "DAMAGED ORDERS"  ? 
          <div
        className="user__details__order"
        onClick={() => {  navigate(`/supplier/${1}/damagedsupply`)} }
          >
            <div  className="order__badge3">
            <span>
              <BsPlusCircle size={20} />
            </span>
            <span>Damaged Orders</span> 
            </div>
          </div>  :
          <div
        className="user__details__order"
        onClick={() => {  navigate(`/supplier/${1}/returnsupply`)} }
          >
            <div  className="order__badge3">
            <span>
              <BsPlusCircle size={20} />
            </span>
            <span>Return Orders</span> 
            </div>
          </div> }
    <div className = "user__details__header">
        <p  className={`${
              activePage === "PLACED ORDERS" ? "supply-active supply-inactive" : "supply-inactive"
            }`}
            onClick={() =>  setActivePage("PLACED ORDERS")}>Placed Orders</p>
        <p  className={`${
              activePage === "RECEIVED ORDERS" ? "supply-active supply-inactive" : "supply-inactive"
            }`}
            onClick={() =>  setActivePage("RECEIVED ORDERS")}>Received Orders</p>
        <p  className={`${
              activePage === "CANCELED ORDERS" ? "supply-active supply-inactive" : "supply-inactive"
            }`}
            onClick={() =>  setActivePage("CANCELED ORDERS")}>Canceled Orders</p>
        <p  className={`${
              activePage === "DAMAGED ORDERS" ?"supply-active supply-inactive" :"supply-inactive"
            }`}
            onClick={() =>  setActivePage("DAMAGED ORDERS")}>Damaged Orders</p>
        <p  className={`${
              activePage === "RETURNED ORDERS" ? "supply-active supply-inactive" :"supply-inactive"
            }`}
            onClick={() =>  setActivePage("RETURNED ORDERS")}>Returned Orders</p>
    </div>

    <div className="user__details__total">
      <p><span className='total__title'>Total : </span>₦65,000</p>

        <div className="date__hidden">
    <span>From</span>
    <span className="ims--place__order">
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
    </span>

    <span>To</span>
    <span className="ims--place__order">
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />
    </span>
  </div>
    </div>


      </div>






    <table className="ims__table">
  <thead className="ims__thead supply__head2">
    <tr className="table__header__ims">
      <th>No</th>
      <th>Item Names</th>
      <th>Quantity</th>
      <th>Size</th>
      <th>Unit Price</th>
      <th>Total Price</th>
      <th>Date</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody  className=" row__supplier supply__table">
    
      {products?.map((item) => (
        <tr className="ims__body">
        <td>{item.no}</td>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{item.size}</td>
        <td>{item.unit}</td>
        <td>{item.total}</td>
        <td>{item.date}</td>
        {/* <td>
                   <select
                     className="supply__action"
                     // onChange={handleChange}
                     // value={newUser.selectRole}
                     name="newselection"
                     required
                    //  onClick={() => console.log("Well Received")}
                     onChange={handleChange}
                     value={newselection}
                   >
                     <option value="" hidden className="placeholderSelect">
                      Action
                     </option>
                     <option onClick={() => console.log("Well Received")} value="Receive Order">Receive Order</option>
                     <option  onClick={() =>console.log("Well Received")} value="Cancel Order">Cancel Order</option>
                   </select>
        </td> */}


                    <td className="ims--action">
                      <span className="ims__action">
                        Action
                        <FaCaretDown onClick={() => setAction(!action)} />
                        <span className={action ? "actions" : "no-display"}>
                          <span
                            style={{ marginBottom: "-0.5rem" }}
                            onClick={() => {
                              setReceive(true);
                              setAction(!action);
                            }}
                          >
                            Receive Order
                          </span>
                          <br />
                          <span
                            onClick={() => {
                              setCancel(true);
                              setAction(!action);
                            }}
                          >
                            Cancel Order
                          </span>
                        </span>
                      </span>
                    </td>
        </tr>
      ))}
    
  </tbody>
  </table>


    </div>

    </>

  )
}

export default SupplyTransaction