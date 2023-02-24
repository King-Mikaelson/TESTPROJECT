import React from 'react'
import {useNavigate} from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import {useState} from "react"
import {BsArrow90DegLeft} from "react-icons/bs";
import {BsFillPersonCheckFill} from "react-icons/bs";

function EditSupplier() {
  const navigate = useNavigate();
  const[currentPage, setCurrentPage] = useState(true);

  return (
    <>
  
        <div className="transactions__backbutton__supply" onClick={() => navigate(-1)}>
          <BsArrow90DegLeft size={22} />
          <p style={{ fontSize: "1.2rem", margin: "0rem" }}>Go Back</p>
        </div>



        <div className='supply__order__container2 form__wrapper'>
        <div className='supply__order__header'>
       <h1>Add New Supplier</h1>
       </div>
        {currentPage ? (
          <>
                <p className='supply__add'>Add item details to place an order</p>
                <form className='supply__order__form'>
                 <div className='supply__order__form__group'>
                 <input type="text" placeholder='Full name'/>
                 </div>
                 <div className='supply__order__form__group'>
                 <input type="email" placeholder='Email address'/>
                 </div>
                 <div className='supply__order__form__group1'>
                 <input type="text" placeholder='Phone Number'/>
                 <div className='input__wrapper'>
                   <select
                     className="supply__select"
                     // onChange={handleChange}
                     // value={newUser.selectRole}
                     name="selectRole"
                     required
                   >
                     <option value="" hidden className="placeholderSelect">
                      Gender
                     </option>
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                     <option value="Other">Other</option>
                   </select>
                 </div>
                 </div>
         
                 <div className='supply__order__form__group'>
                 <input type="text" placeholder='Address'/>
                 </div>
                 <div className='supply__order__form__group'>
                 <input type="text" placeholder='Product'/>
                 </div>
                 <div>
                  <h3 className="supply__payment__info">Payment Information</h3>
                  <div className="supply__payment__parent">
                  <div className="supply__payment__group first">
                  <p>Total Amount Paid:</p>
                  <input type="text"/>
                  </div>
                  <div  className="supply__payment__group">
                  <p>Total Pending Amount to be paid:</p>
                  <input type="text"/>
                  </div>
                  </div>
                  
                 <div className='supply__order__form__group2'>
                 <button onClick={() => setCurrentPage( prevValue => !prevValue)} className='supply__order__form__button1'>Add Supplier</button>
                 <button onClick={() => navigate(-1)} style={{background:"transparent", border:'1px solid var(--primary-color)', color:'var(--primary-color)'}} className='supply__order__form__button1'>Cancel</button>
                 </div>
                 </div>
                 
                 </form>
       </> )  : (
        <>
        <div  className='supply__success__message'>
        < BsFillPersonCheckFill size={200} />
        <p>A New Supplier Has Been Added Successfully</p>
        </div>
        </> )
         }
 
    </div>
    </>
   
  )
}

export default EditSupplier;