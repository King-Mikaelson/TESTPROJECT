import TopBar from "../../components/topbar/TopBar";
import Category from "../../components/category/Category";
import AddMenuProduct from "./AddMenuProduct";
import { useState, useContext} from "react";
import MenuBarCategory from "./MenuBarCategory";
import "./MenuBar.css";
import "../../components/category/Category.css";
import AuthContext from "../../context/AuthContext";

const MenuBar = () => {
  const [addProducts, setAddProducts] = useState(false)
  const { showCartMenu} = useContext(AuthContext);
    return ( 
        <>
      <TopBar />
      <div className="orders__wrapper">
        <div className="orders__left">
          <MenuBarCategory/>
        </div>
        <div className="orders__right">
          {addProducts ? <button >Add product</button> : < AddMenuProduct />}
        </div>
        <div className={"orders__right"}>
        < AddMenuProduct />
        </div>
      </div>
    </>
     );
}
 
export default MenuBar;