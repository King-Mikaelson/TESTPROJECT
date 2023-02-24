import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Filters from "../filters/Filters";
import OrderPageLoad from "../loaders/OrderPageLoad";
import "./Category.css";
import SingleProduct from "./SingleProduct";

const Category = () => {
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
          return <SingleProduct items={item} key={index} />;
        })}
      </div>
    </>
  );
};

export default Category;
