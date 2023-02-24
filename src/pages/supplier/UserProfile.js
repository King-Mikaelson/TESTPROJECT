import {BsFillPersonFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {Outlet} from "react-router-dom";
import {BsArrow90DegLeft} from "react-icons/bs";





function UserProfile() {

    const navigate = useNavigate();
 

  return (
    <div className="user__container">
       <div className="transactions__backbutton__supply" style={{marginBottom:"1.5rem"}} onClick={() => navigate(-1)}>
          <BsArrow90DegLeft size={22} />
          <p style={{ fontSize: "1.2rem", margin: "0rem" }}>Go Back</p>
        </div>

        <div className="user__content">
        <div className="user__card">
        <button onClick={() => navigate("/supplier/edit-supplier")} className="edit">Edit</button>
        <div className="person">
        <BsFillPersonFill size={100}/>
        </div>
        <h1 className="username">Alucard</h1>
        <div className="user__details__container">
        <p className="user__details__title">Personal Details</p>
        <div className="user__details__profile">
        <div  style={{display:"flex"}}>
          <img src="Gender.png" alt="gender logo"/>
        <p>Gender </p>  
        </div>
        <p> : Male</p>
        </div>

        <div className="user__details__profile">
        <div  style={{display:"flex"}}>
        <img src="bxs_phone.png" alt="phone logo"/>
        <p>Phone </p>
        </div>
        <p> : 07049078543</p>
        </div>


        <div className="user__details__profile">
        <div  style={{display:"flex",gap:"0.3rem",justifyContent:'center', alignItems:'center'}}>
        <img  style={{display:"flex",gap:"0.3rem", justifyContent:'center', alignItems:'center'}} src="Email.png" alt="email"/>
        <p>Email </p>
        </div>
        <p className="text">: anazodomichael27
          @gmail.com</p>
        </div>


        <div className="user__details__profile">
        <div style={{display:"flex",gap:"0.3rem",justifyContent:'center', alignItems:'center'}}>
        <img src="Location.png" alt="location logo"/>
        <p>Address</p> 
        </div>
        <p  className="text">: 7 Ihiala Avenue,
         New Haven, Enugu.</p>
        </div>
       
        </div>




        <div className="user__details__transactions">
        <p className="user__details__title">Total Transaction Details</p>
        <div className="user__details__profile1">
        <p>Placed Orders :  58</p>
        <p>Received Orders :  52</p>
        <p>Canceled Orders :  45</p>
        <p>Damaged Orders :  30</p>
        <p>Returned Orders :  12</p>
        </div>
       
        </div>


        <div className="user__details__status">
        <p className="user__details__title">Total Payment Status </p>
        <div className="user__details__profile1">
        <p>Amount Paid: 150000</p>
        <p>Due/Pending : 50000</p>
        </div>
       
        </div>
        
        </div>
        <Outlet />
        </div>
    </div>
  )
}

export default UserProfile
