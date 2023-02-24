import { useContext } from "react";
import { GoThreeBars } from "react-icons/go";
import AuthContext from "../../context/AuthContext";
import "./TopBar.css";

const TopMenu = () => {
  const current = new Date();
  const date = `${current.toLocaleString("en-US", {
    weekday: "long",
  })}, ${current.toLocaleString("en-US", {
    month: "long",
  })} ${current.getDate()}, ${current.getFullYear()}`;

  const { toggleSideBar, toggleCartMenu } = useContext(AuthContext);

  const menuActions = () => {
    toggleSideBar((prevValue) => !prevValue);
    toggleCartMenu(false);
  };
  return (
    <div className="topbar__container menu">
      <div className="menu__icons" style={{marginLeft:"16px", marginTop:"0.5rem"}}>
        <GoThreeBars size={24} onClick={menuActions} />
      </div>

      <div className="menu__icons cart date">{date}</div>
    </div>
  );
};

export default TopMenu;
