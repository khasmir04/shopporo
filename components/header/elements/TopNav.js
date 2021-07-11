import { Select } from "antd";
import Link from "next/link";
import { withSession } from "../../../middlewares/session";
import { useRouter } from "next/router";
// import { useSelector, useDispatch } from "react-redux";
// import React from "react";

// import {
//   setGlobalLanguage,
//   setGlobalCurrency,
// } from "../../../redux/actions/globalActions";
import Container from "../../other/Container";

function TopNav({ containerType, userData }) {
  const { Option } = Select;

  // const dispatch = useDispatch();
  // const globalState = useSelector((state) => state.globalReducer);
  // const onSelectLanguage = (value) => {
  //   dispatch(setGlobalLanguage(value));
  // };
  // const onSelectCurrency = (value) => {
  //   dispatch(setGlobalCurrency(value));
  // };
  const router = useRouter();
  const onLogout = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch("/api/logout", {
        method: "POST",
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="top-nav">
      <Container type={containerType}>
        <div className="top-nav-wrapper">
          <div className="top-nav-selects">
            {/* <Select
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
            </Select> */}
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
            {userData ? (
              <div className="top-nav-links__item md:flex items-center justify-center">
                <a className="md:mr-7 capitalize">
                  Hi {userData.data.user.display_name}!{" "}
                </a>
                <div>
                  <a href="/api/logout" onClick={onLogout}>
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <div className="top-nav-links__item">
                <Link href="/login">
                  <a>Hi Guest, Login</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default TopNav;
