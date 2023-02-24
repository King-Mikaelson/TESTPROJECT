import { useContext } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/sidebar/SideBar";
import "./Homelayout.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../context/AuthContext";
import AppLogout from "../../components/AppLogout";

const HomeLayout = () => {
  const { showSideBar, toggleSideBar } = useContext(AuthContext);

  const closeModal = (e) => {
    if (e.target.id === "bg") {
      toggleSideBar(false);
    }
  };

  return (
    <AppLogout>
      <div className={showSideBar ? "home__wrapper mobile" : "home__wrapper"}>
        <div className="home__left">
          <SideBar />
        </div>

        <div
          className={showSideBar ? "backdrop__container" : "no-display"}
          id="bg"
          onClick={closeModal}
        >
          <div className={showSideBar ? "home__left mobile" : "no-display"}>
            <SideBar />
          </div>
        </div>

        <div className="home__right">
          <Outlet />
          <ToastContainer />
        </div>
      </div>
    </AppLogout>
  );
};

export default HomeLayout;
