import { useEffect } from "react";
import { useContext, useState } from "react";
import DashboardCard from "../../components/dashboardcards/DashboardCard";
import AuthContext from "../../context/AuthContext";
import "./Dashboard.css";
import SingleTableDetail from "../../components/details/SingleTableDetail";
import TopMenu from "../../components/topbar/TopMenu";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const {
    user,
    tables,
    displayTables,
    adminTables,
    displayAdminTables,
    getOrderCount,
    cashPaymentsUncleared,
    posPaymentsUncleared,
    transferPaymentsUncleared,
    totalRevenueUncleared,
    orderCount,
    notifCount,
    adminCashUncleared,
    adminPosUncleared,
    adminTransferUncleared,
    adminTotalUncleared,
  } = useContext(AuthContext);
  const activeUser = user.username;
  const activePasscode = user.passcode;
  const [getUserCredit, setGetUserCredit] = useState({});

  useEffect(() => {
    if (
      user.role === "Super Admin" ||
      user.role === "Administrator" ||
      user.role === "Store Manager"
    ) {
      displayAdminTables(activeUser, activePasscode);
    } else {
      displayTables(activeUser);
    }
  }, [activeUser, activePasscode]);

  useEffect(() => {
    if (
      user.role === "Super Admin" ||
      user.role === "Administrator" ||
      user.role === "Store Manager"
    ) {
      getOrderCount(activeUser, activePasscode);
    } else {
      getOrderCount(activeUser, activePasscode);
    }
  }, [activePasscode]);

  // FUNCTION TO GET USER CREDIT
  const getCreditReport = async (activeUser) => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/user-credit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
          }),
        }
      );
      const data = await response.json();
      setGetUserCredit(data);
    } catch (err) {
      console.log(err, "Credit not fetched");
    }
  };

  //FUNCTION TO CLEAR TABLES
  const clearTables = async () => {
    try {
      const response = await fetch(
        "https://swift-lounge.onrender.com/clear-tables",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
          }),
        }
      );
      if (response.ok) {
        if (
          user.role === "Super Admin" ||
          user.role === "Administrator" ||
          "Supervisor" ||
          user.role === "Store Manager"
        ) {
          displayAdminTables(activeUser, activePasscode);
        } else {
          displayTables(activeUser);
        }
      }
    } catch (err) {
      console.log(err, "Credit not fetched");
    }
  };

  useEffect(() => {
    getCreditReport(activeUser);
  }, []);

  return (
    <>
      <TopMenu />
      {user.role === "Bar Man" && (
        <Link to={"/notifications"}>
          <div className="notifications">
            <p>Notifications</p>
            <FaBell size={30} />
            <span className="notif">{notifCount}</span>
          </div>
        </Link>
      )}
      <div className="cards__container">
        <DashboardCard
          color="var(--primary-color)"
          styling="dashboard__card"
          numbers={`₦${
            user.role === "Super Admin" ||
            user.role === "Administrator" ||
            user.role === "Store Manager"
              ? adminTotalUncleared
              : totalRevenueUncleared
          }`}
          title="Total Revenue"
        />
        <DashboardCard
          color="var(--primary-color)"
          styling="dashboard__card"
          numbers={`${orderCount}`}
          title="Total Orders"
        />
        <DashboardCard
          color="var(--primary-color)"
          styling="dashboard__card"
          numbers={`₦${
            user.role === "Super Admin" ||
            user.role === "Administrator" ||
            user.role === "Store Manager"
              ? adminPosUncleared
              : posPaymentsUncleared
          }`}
          title="POS Payments"
        />
        <DashboardCard
          color="var(--primary-color)"
          styling="dashboard__card"
          numbers={`₦${
            user.role === "Super Admin" ||
            user.role === "Administrator" ||
            user.role === "Store Manager"
              ? adminCashUncleared
              : cashPaymentsUncleared
          }`}
          title="Cash Payments"
        />
        <DashboardCard
          color="var(--primary-color)"
          styling="dashboard__card"
          numbers={`₦${
            user.role === "Super Admin" ||
            user.role === "Administrator" ||
            user.role === "Store Manager"
              ? adminTransferUncleared
              : transferPaymentsUncleared
          }`}
          title="Transfer Payments"
        />

        <DashboardCard
          color="var(--primary-color)"
          styling="dashboard__card"
          title={`Opening Credit: ₦ ${
            getUserCredit.opening_credit === null
              ? 0
              : getUserCredit.opening_credit === undefined
              ? 0
              : getUserCredit.opening_credit
          }`}
          title2={`Total Credit Granted: ₦${
            getUserCredit.credit_granted === null
              ? 0
              : getUserCredit.credit_granted === undefined
              ? 0
              : getUserCredit.credit_granted
          }`}
          title3={`Credit Remaining:  ₦ ${
            getUserCredit.credit_remaining === null
              ? 0
              : getUserCredit.credit_remaining === undefined
              ? 0
              : getUserCredit.credit_remaining
          }`}
        />
      </div>

      {(user.role === "Super Admin" ||
        user.role === "Administrator" ||
        user.role === "Supervisor") && (
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            marginRight: "5rem",
            marginTop: "1rem",
          }}
        >
          <strong
            onClick={() => clearTables()}
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--yellow)",
              padding: "0.5rem",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Clear Tables
          </strong>
        </div>
      )}
      {user.role === "Super Admin" ||
      user.role === "Administrator" ||
      user.role === "Store Manager" ? (
        <div className="tables">
          {adminTables.map((t, index) => {
            return <SingleTableDetail table={t} key={index} />;
          })}
        </div>
      ) : (
        <div className="tables">
          {tables.map((t, index) => {
            return <SingleTableDetail table={t} key={index} />;
          })}
        </div>
      )}
    </>
  );
};

export default Dashboard;
