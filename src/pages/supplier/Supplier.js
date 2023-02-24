import SupplierDashboard from "./SupplierDashboard";
import { useContext, useState } from "react";
import TableContext from "../../context/TableContext";
import {BsFillPersonFill, BsFillTelephoneFill} from "react-icons/bs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {useNavigate} from "react-router-dom"



function Supplier() {

  const navigate = useNavigate();
  const [supplyArray, setSupplyArray] = useState([
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite: true
    },
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite: false
    },
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite: true
    },
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite:false
    },
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite: true
    },
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite: false,
    },
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite: true
    },
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite: false
    },
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite: true
    },
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite: false
    },
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite: true
    },
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite: false
    },
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite: true
    },
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite: false
    },
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite: true
    },
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite: false
    },
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite: true
    },
    {
      username:"Obinna",
      dept:"Wines",
      no: "07049078543",
      isFavourite: false
    }
  ])


  const {
    activeItem, 
    setActiveItem,
    searchResult, 
    setSearchResult
  } = useContext(TableContext);



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

  const changeFavourite = (item) => {
    let newArray = [...supplyArray]
    newArray[item].isFavourite = !newArray[item].isFavourite
    setSupplyArray(newArray)
  }

  return (
    <div className="form__wrapper supply__wrapper">
      <SupplierDashboard/>
      {activeItem === "SUPPLIER" ? (
        <div style={{marginTop:"21rem"}} className="supply__card">
        {supplyArray?.map((item, index) => (
         <div key={index} className="card">
         < BsFillPersonFill color="#ec9c04" size={35}/>
          <span className="card__name">{item.username}</span>
          <span  className="card__dept">{item.dept}</span>
          <div  className="card__phone">
          <BsFillTelephoneFill  size={20}/>
          <span>{item.no}</span>
          </div>
          <hr/>
          <div
               className="card__action2">
            <button  onClick={() => {
                  navigate(`/supplier/${1}/order`);
                }}>Take Action</button>
          {item.isFavourite ?  <AiFillStar onClick={() =>changeFavourite(index)} color="#ec9c04" size={25}/> : <AiOutlineStar onClick={() => changeFavourite(index)}  size={25} />} 
          </div>
         </div>
        ))}
        </div>
      ) :
      
      <table  style={{marginTop:"21rem"}} className="ims__table">
      <thead className="ims__thead supply__head">
        <tr className="table__header__ims">
          <th>No</th>
          <th>Item Names</th>
          <th>Quantity</th>
          <th>Size</th>
          <th>Unit Price</th>
          <th>Total Price</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        
          {products.map((item) => (
            <tr className="ims__body">
            <td>{item.no}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.size}</td>
            <td>{item.unit}</td>
            <td>{item.total}</td>
            <td>{item.date}</td>
            </tr>
          ))}
        
      </tbody>
      </table>}


    </div>
  )
}

export default Supplier
