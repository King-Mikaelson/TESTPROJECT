import React from 'react'
import {useNavigate} from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";


function ReturnedSupply() {
  const navigate = useNavigate();

  return (
    <div className='supply__order__container form__wrapper'>
        <div className='supply__order__header'>
        <div onClick={() => navigate(-1)}>
          <MdOutlineArrowBackIos size={22} />
        </div>
       <h1>Return Order</h1>
       </div>
       <p className='supply__add'>Add item details to record returned order</p>
       <form className='supply__order__form'>
        <div className='supply__order__form__group'>
        <input type="text" placeholder='Enter Item Name'/>
        </div>
        <div className='supply__order__form__group'>
        <input type="text" placeholder='Quantity'/>
        </div>
        <div className='supply__order__form__group1'>
        <input type="text" placeholder='Size'/>
        <div className='input__wrapper'>
          <select
            className="supply__select"
            // onChange={handleChange}
            // value={newUser.selectRole}
            name="selectRole"
            required
          >
            <option value="" hidden className="placeholderSelect">
             Unit Of Measurement
            </option>
            <option value="L">L</option>
            <option value="ML">ML</option>
            <option value="KILO">KILO</option>
            <option value="MILIGRAM">MILIGRAM</option>
            <option value="GRAMS">GRAMS</option>
          </select>
        </div>
        </div>

        <div className='supply__order__form__group'>
        <input type="text" placeholder='Unit Price'/>
        </div>
        <div className='supply__order__form__group'>
        <input type="text" placeholder='Total Price'/>
        </div>
        <div className='supply__order__form__group'>
        <button className='supply__order__form__button'>Return Order</button>
        </div>
        </form>
    </div>
  )
}

export default ReturnedSupply