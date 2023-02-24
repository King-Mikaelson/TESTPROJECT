import "./Settings.css";
import { Link } from "react-router-dom";
import TopMenu from "../../components/topbar/TopMenu";

const Settings = () => {
  return (
    <>
      <TopMenu />
      <div>
        <div className="settings__wrapper">
          <Link to="/settings/staff" className="staff__manager">
            staff Manager
          </Link>

          <Link to="/settings/reports" className="reports">
            reports
          </Link>
        </div>
      </div>
    </>
  );
};

export default Settings;
