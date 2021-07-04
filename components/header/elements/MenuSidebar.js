import { Menu, Select } from "antd";
// import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

// import {
//   setGlobalLanguage,
//   setGlobalCurrency,
// } from "../../../redux/actions/globalActions";

const MenuSidebar = () => {
  const { SubMenu } = Menu;
  const { Option } = Select;
  // const dispatch = useDispatch();
  // const globalState = useSelector((state) => state.globalReducer);
  // const onSelectLanguage = (value) => {
  //   dispatch(setGlobalLanguage(value));
  // };
  // const onSelectCurrency = (value) => {
  //   dispatch(setGlobalCurrency(value));
  // };
  return (
    <div className="menu-sidebar">
      <Menu mode="inline">
        <SubMenu key="sub1" title="Homepages">
          <Menu.Item key="1">
            <Link href={process.env.PUBLIC_URL + "/"}>
              <a>Homepage 1</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href={process.env.PUBLIC_URL + "/homepage2"}>
              <a>Homepage 2</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link href={process.env.PUBLIC_URL + "/homepage3"}>
              <a>Homepage 3</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link href={process.env.PUBLIC_URL + "/homepage4"}>
              <a>Homepage 4</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title="Shop">
          <SubMenu key="sub2-1" title="Shop detail">
            <Menu.Item key="5">
              <Link
                href={
                  process.env.PUBLIC_URL +
                  "/shop/product-detail/product-detail-1"
                }
              >
                <a>Product Detail 1</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link
                href={
                  process.env.PUBLIC_URL +
                  "/shop/product-detail/product-detail-2"
                }
              >
                <a>Product Detail 2</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link
                href={
                  process.env.PUBLIC_URL +
                  "/shop/product-detail/product-detail-3"
                }
              >
                <a>Product Detail 3</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="8">
            <Link href={process.env.PUBLIC_URL + "/shop/checkout"}>
              <a>Checkout</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="9">
            <Link href={process.env.PUBLIC_URL + "/shop/checkout-complete"}>
              <a>Checkout Complete</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="10">
          <Link href={process.env.PUBLIC_URL + "#"}>
            <a>Help</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="11">
          <Link href={process.env.PUBLIC_URL + "#"}>
            <a>Offer</a>
          </Link>
        </Menu.Item>
      </Menu>
      <div className="menu-sidebar-selects">
        <Select
          // defaultValue={globalState.language}
          style={{ width: 120 }}
          bordered={false}
        // onChange={onSelectLanguage}
        >
          <Option value="en">English</Option>
          <Option value="jp">Japanese</Option>
          <Option value="vi">Vietnamese</Option>
        </Select>
        <Select
          // defaultValue={globalState.currency.currency}
          style={{ width: 150 }}
          bordered={false}
        // onChange={onSelectCurrency}
        >
          <Option value="USD">USD - Dollar</Option>
          <Option value="JPY">JPY - Yen</Option>
          <Option value="VND">VND - Vietnam dong</Option>
        </Select>
      </div>
    </div>
  );
}

export default MenuSidebar;
