import { Outlet } from "react-router-dom";
import { TableProvider } from "../../context/TableContext";

const MyContextLayout = () => {
  return (
    <TableProvider>
      <Outlet />
    </TableProvider>
  );
};

export default MyContextLayout;
