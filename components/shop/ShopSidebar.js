import Link from "next/link";
// import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { Select } from "antd";

import { SHOP } from "../../common/defines";
// import { setSubCategory } from "../../redux/actions/shopActions";

function ShopSidebar({ categories }) {
  const { Option } = Select;
  // const dispatch = useDispatch();
  // const globalState = useSelector((state) => state.globalReducer);
  // const shopState = useSelector((state) => state.shopReducer);

  const subCategory = SHOP.category.find(
    // SET TO EMPTY TEMPORARILY
    (item) => item.name.toLowerCase() === ""
    // (item) => item.name.toLowerCase() === globalState.category.toLowerCase()
  );
  const onChooseSubCategory = (data) => {
    if (!data || data === "all") {
      // return dispatch(setSubCategory(""));
    }
    // return dispatch(setSubCategory(data));
  };
  const handleChange = (value) => {
    onChooseSubCategory(value);
  };
  return (
    <div className="shop-sidebar">
      {/* <h5>{globalState.category}</h5> */}
      <h5>Category</h5>
      <div className="shop-sidebar__subcategory">
        <ul>
          <li
            // active: shopState.subCategory === "",
            // REPLACE WITH EMPTY FOR NOW
            className={classNames({
              active: "" === "",
            })}
          >
            <Link href="#">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  onChooseSubCategory("all");
                }}
              >
                <i className="icon_document_alt" />
                All Category
              </a>
            </Link>
          </li>

          {/* {subCategory &&
            subCategory.sub.slice(0, 7).map((item, index) => ( */}
          {/* THIS IS TEMPORARY, REPLACE WITH SUBCATEGORY ABOVE */}
          {SHOP.category[0].sub.map((item, index) => (
            <li
              // active: "clothing" === item.name,
              // THIS IS TEMPORARY, REPLACE WITH shopState.subCategory ABOVE
              key={index}
              className={classNames({
                // active: shopState.subCategory === item.name,
                active: "clothing" === item.name,
              })}
            >
              <Link href="#">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    onChooseSubCategory(item.name);
                  }}
                >
                  <i className={item.iconClass} />
                  {item.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="shop-sidebar__subcategory-mobile">
        <Select
          defaultValue="all"
          style={{ width: "100%" }}
          onChange={handleChange}
          // value={shopState.subCategory === "" ? "all" : shopState.subCategory}
          // REPLACED WITH EMPTY FOR NOW
          value={"" === "" ? "all" : shopState.subCategory}
        >
          <Option value="all">
            <i className="icon_document_alt" />
            All Category
          </Option>
          {subCategory &&
            subCategory.sub.map((item, index) => (
              <Option key={index} value={item.name}>
                {" "}
                <i className={item.iconClass} />
                {item.name}
              </Option>
            ))}
        </Select>
      </div>
    </div>
  );
}

export default ShopSidebar;
