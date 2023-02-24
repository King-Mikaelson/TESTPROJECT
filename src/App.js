import React, { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { TableProvider } from "./context/TableContext";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import HomeLayout from "./layout/homelayout/HomeLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Orders from "./pages/orders/Orders";
import MenuBar from "./pages/MenuBar/MenuBar";
import Settings from "./pages/settings/Settings";
import NewTable from "./pages/newtable/NewTable";
import StaffManager from "./pages/settings/staff/StaffManager";
import AddStaff from "./pages/settings/staff/AddStaff";
import UpdateStaff from "./pages/settings/staff/UpdateStaff";
import ChangeRole from "./pages/settings/staff/ChangeRole";
import StaffCredit from "./pages/settings/staff/StaffCredit";
import Reports from "./pages/settings/reports/Reports";
import IndividualReport from "./pages/settings/reports/IndividualReport";
import GeneralReport from "./pages/settings/reports/GeneralReport";
import UpdateOrder from "./pages/dashboard/UpdateOrder";
import IndividualReportPerWaiter from "./pages/settings/reports/IndividualReportPerWaiter";
import MyContextLayout from "./layout/contextlayout/MyContextLayout";
import Notifications from "./pages/notifications/Notifications";
import WaiterNotif from "./pages/notifications/WaiterNotif";
import Inventory from "./pages/inventory/Inventory";
import PlaceOrder from "./pages/inventory/PlaceOrder";
import DeptTransactions from "./pages/inventory/DeptTransactions";
import Supplier from "./pages/supplier/Supplier";
import UserProfile from "./pages/supplier/UserProfile";
import NotificationsIms from "./pages/inventory/NotificationsIms";
import SupplyTransaction from "./pages/supplier/SupplyTransaction";
import PlaceSupply from "./pages/supplier/PlaceSupply";
import CancelSupply from "./pages/supplier/CancelSupply";
import ReturnedSupply from "./pages/supplier/ReturnedSupply";
import DamagedSupply from "./pages/supplier/DamagedSupply";
import ReceiveSupply from "./pages/supplier/ReceiveSupply";
import NewSupplier from "./pages/supplier/NewSupplier";
import EditSupplier from "./pages/supplier/EditSupplier";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<HomeLayout />}>
            <Route path="/orders/newtable" element={<NewTable />} />
            <Route element={<MyContextLayout />}>
              <Route path="/orders" element={<Orders />} />
              <Route path="/menubar" element={<MenuBar />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/notifications/:waiter" element={<WaiterNotif />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/inventory/placeorder" element={<PlaceOrder />} />
              <Route path="/transactions" element={<DeptTransactions />} />

               {/* supplier routes */}
            <Route path="/supplier" element={<Supplier/>}/>
            <Route path="/supplier/add-supplier" element={<NewSupplier />}/>
            <Route path="/supplier/edit-supplier" element={<EditSupplier />}/>
            <Route path="/supplier/:customer" element={<UserProfile/>}>
              <Route path="/supplier/:customer/supplyorder" element={<PlaceSupply />}/>
              <Route path="/supplier/:customer/cancelsupply" element={<CancelSupply />}/>
              <Route path="/supplier/:customer/returnsupply" element={<ReturnedSupply />}/>
              <Route path="/supplier/:customer/damagedsupply" element={<DamagedSupply />}/>
              <Route path="/supplier/:customer/receivesupply" element={<ReceiveSupply />}/>
              <Route path="/supplier/:customer/order" element={<SupplyTransaction/>}/>
            </Route>
            <Route path="/notificationsims" element={<NotificationsIms />} />
            </Route>
            <Route path="/updateorder" element={<UpdateOrder />} />
            <Route path="/settings" element={<Settings />} />


 
            {/* staff routes */}
            <Route path="/settings/staff" element={<StaffManager />} />
            <Route path="/settings/staff/add" element={<AddStaff />} />
            <Route path="/settings/staff/update" element={<UpdateStaff />} />
            <Route path="/settings/staff/credit" element={<StaffCredit />} />
            <Route path="/settings/staff/roles" element={<ChangeRole />} />
            {/* reports routes */}
            <Route path="/settings/reports" element={<Reports />} />
            <Route
              path="/settings/reports/individual"
              element={<IndividualReport />}
            />
            <Route
              path="/settings/reports/individual/:waitername"
              element={<IndividualReportPerWaiter />}
            />
            <Route
              path="/settings/reports/general"
              element={<GeneralReport />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
