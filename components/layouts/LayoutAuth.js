import Head from "next/head";
import { BackTop, message } from "antd";
import classNames from "classnames";

import Footer from "../footer/Footer";
import HeaderAuth from "../header/HeaderAuth";

const LayoutAuth = ({
  title,
  containerType,
  children,
  clearSpaceTop,
}) => {
  message.config({
    maxCount: 3,
    duration: 1,
  });
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <HeaderAuth />
      <div className={`bg-gray-200 ${classNames({ "clear-top": clearSpaceTop })}`}>
        {children}
      </div>
      <Footer containerType={containerType} />
      <BackTop />
    </>
  );
}

export default LayoutAuth;
