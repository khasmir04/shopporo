import { Select } from "antd";
import Link from "next/link";
// import { useSelector, useDispatch } from "react-redux";
// import React from "react";

// import {
//   setGlobalLanguage,
//   setGlobalCurrency,
// } from "../../../redux/actions/globalActions";
import Container from "../../other/Container";

function TopNav({ containerType }) {
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
    <div className="top-nav">
      <Container type={containerType}>
        <div className="top-nav-wrapper">
          <div className="top-nav-selects">
            <Select
              // defaultValue={globalState.language}
              style={{ width: 90 }}
              bordered={false}
            // onChange={onSelectLanguage}
            >
              <Option value="en">English</Option>
              <Option value="jp">Japanese</Option>
              <Option value="vi">Vietnamese</Option>
            </Select>
            <Select
              // defaultValue={globalState.currency.currency}
              style={{ width: 120 }}
              bordered={false}
            // onChange={onSelectCurrency}
            >
              <Option value="USD">USD - Dollar</Option>
              <Option value="JPY">JPY - Yen</Option>
              <Option value="VND">VND - Vietnam dong</Option>
            </Select>
          </div>
          <div className="top-nav-links">
            <div className="top-nav-links__item">
              <Link href={process.env.PUBLIC_URL + "/#"}>
                <a>
                  <i className="icon_question_alt2" />
                  Help
                </a>
              </Link>
            </div>
            <div className="top-nav-links__item">
              <Link href={process.env.PUBLIC_URL + "/#"}>
                <a>
                  <i className="icon_gift" /> Offer
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default TopNav;
