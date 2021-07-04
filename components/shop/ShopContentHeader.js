import { Select } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// ADDED THIS FOR NOW
// import { useState } from "react";

// import { setSort } from "../../redux/actions/shopActions";

function ShopContentHeader({ data, productPerPage }) {
  const { Option } = Select;
  const dispatch = useDispatch();
  const shopState = useSelector((state) => state.shopReducer);
  const handleChange = (value) => {
    dispatch(setSort(value));
  };
  return (
    <div className="shop-content__header">
      <div className="shop-content__header-showing">
        <h5>
          Showing 1 - {productPerPage} of {data.length} Products
        </h5>
      </div>
      <div className="shop-content__header-filter">
        <p>Filter by:</p>
        <Select
          className="shop-content__header-filter__select"
          defaultValue={shopState.sort}
          style={{ width: 250 / 16 + "em" }}
          onChange={handleChange}
        >
          <Option value="default">Default</Option>
          <Option value="lowHigh">Price: Low to High</Option>
          <Option value="highLow">Price: High to Low</Option>
          <Option value="az">A to Z</Option>
          <Option value="za">Z to A</Option>
        </Select>
      </div>
    </div>
  );
}

export default ShopContentHeader;
