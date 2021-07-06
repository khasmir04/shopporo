// import React from "react";
import ShopContentHeader from "./ShopContentHeader";
import ShopContentProduct from "./ShopContentProduct";

function ShopContent({
  fourColumn,
  productResponsive,
  data,
  productPerPage,
  productStyle,
}) {
  return (
    <div className="shop-content">
      <ShopContentHeader productPerPage={productPerPage} data={data} />
      <ShopContentProduct
        productStyle={productStyle}
        fourColumn={fourColumn}
        productResponsive={productResponsive}
        data={data}
        productPerPage={productPerPage}
      />
    </div>
  );
}

export default ShopContent;
