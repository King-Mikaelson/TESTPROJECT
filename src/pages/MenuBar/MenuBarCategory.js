import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Filters from "../../components/filters/Filters";
import OrderPageLoad from "../../components/loaders/OrderPageLoad";
import SingleProduct from "../../components/category/SingleProduct";
import MenuBarSingleproduct from "./MenuBarSingleProduct";

const MenuBarCategory = () => {
  const {
    state: { items },
  } = useContext(AuthContext);
  const { transformItems } = useContext(AuthContext);

  return (
    <>
      <Filters />
      <div className="category__heading">
        {!items.length && <OrderPageLoad />}
        {transformItems(items).map((item, index) => {
          return <MenuBarSingleproduct items={item} key={index} />;
        })}
      </div>
    </>
  );
};

export default MenuBarCategory;
