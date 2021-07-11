// import React from "react";
import ShopContentHeader from "./ShopContentHeader";
import ShopContentProduct from "./ShopContentProduct";

function ShopContent({
  fiveColumn,
  productResponsive,
  data,
  productPerPage,
  productStyle,
  user,
}) {
  return (
    <div className="shop-content">
      <ShopContentHeader productPerPage={productPerPage} data={data} />
      <ShopContentProduct
        productStyle={productStyle}
        fiveColumn={fiveColumn}
        productResponsive={productResponsive}
        data={data}
        productPerPage={productPerPage}
        user={user}
      />
    </div>
  );
}

export default ShopContent;
