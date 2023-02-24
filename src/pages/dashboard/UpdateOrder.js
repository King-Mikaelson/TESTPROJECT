import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./Dashboard.css";
import TopMenu from "../../components/topbar/TopMenu";
import UpdateSingleTable from "../../components/details/UpdateSingleTable";

const UpdateOrder = () => {
  const { user, tables, displayTables, adminTables, displayAdminTables } =
    useContext(AuthContext);
  const activeUser = user.username;
  const activePasscode = user.passcode;

  useEffect(() => {
    if (user.role === "Super Admin" || user.role === "Administrator") {
      displayAdminTables(activeUser, activePasscode);
    } else {
      displayTables(activeUser);
    }
  }, [activeUser, activePasscode]);

  return (
    <>
      <TopMenu />
      <div className="tables">
        {user.role === "Super Admin" || user.role === "Administrator" ? (
          <div className="tables">
            {adminTables.map((t, index) => {
              return <UpdateSingleTable table={t} key={index} />;
            })}
          </div>
        ) : (
          <div className="tables">
            {tables.map((t, index) => {
              return <UpdateSingleTable table={t} key={index} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateOrder;
