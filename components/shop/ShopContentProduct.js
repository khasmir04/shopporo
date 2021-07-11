import { Row, Col, Empty, Pagination } from "antd";
// import { useSelector } from "react-redux";
import classNames from "classnames";

import Product from "../product/Product";
// import {
//   getProductsByFilter,
//   getProductsBySearch,
// } from "../../common/shopUtils";
import { useState, useEffect } from "react";

const ShopContentProduct = ({
  productResponsive,
  fiveColumn,
  data,
  productPerPage,
  productStyle,
  user,
}) => {
  // const shopState = useSelector((state) => state.shopReducer);
  // const globalState = useSelector((state) => state.globalReducer);

  const currentData = data;
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  // const getData = async (offSet) => {
  //   try {
  //     const res = await fetch(
  //       `${process.env.BACKEND_URL}/wp-json/public-woo/v3/products/?per_page=16&offset=${offSet}`,
  //       {
  //         method: "GET",
  //       }
  //     );

  //     const result = await res.json();
  //     console.log(result);
  //     setCurrentData(result);
  //   } catch (error) {
  //     console.log("Fetching products failed:", error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, [data]);

  // useEffect(() => {
  //   let filteredProduct = getProductsByFilter(
  //     [...data],
  //     shopState.sort,
  //     shopState.subCategory
  //   );
  //   setCurrentData(filteredProduct);
  //   setOffset(0);
  // }, [shopState, data]);

  // useEffect(() => {
  //   setPage(1);
  // }, [globalState]);

  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <a>
          <i className="fal fa-angle-left" />
        </a>
      );
    }
    if (type === "next") {
      return (
        <a>
          <i className="fal fa-angle-right" />
        </a>
      );
    }
    return originalElement;
  };

  const onChangeOffset = (page, pageSize) => {
    let offset = (page - 1) * pageSize;
    setPage(page);
    setOffset(offset);
  };

  return (
    <div className="shop-content__product">
      {!currentData ? (
        <Empty description={"No products"} />
      ) : (
        <>
          {currentData.length > 0 ? (
            <>
              <Row gutter={[{ xs: 5, sm: 5, xl: 15, xxl: 30 }, 30]}>
                {currentData
                  .slice(offset, offset + productPerPage)
                  .map((product) => (
                    <Col
                      key={product.id}
                      className={classNames({ "five-col": fiveColumn })}
                      {...productResponsive}
                    >
                      <Product
                        data={product}
                        productStyle={productStyle}
                        key={product.id}
                        user={user}
                      />
                    </Col>
                  ))}
              </Row>
              {currentData.length >= productPerPage && (
                <Pagination
                  showSizeChanger={false}
                  className={"mt-10 flex justify-center"}
                  classNames="shop-content__product-pagination"
                  defaultCurrent={1}
                  current={page}
                  total={currentData.length}
                  pageSize={productPerPage}
                  itemRender={itemRender}
                  onChange={(page, pageSize) => onChangeOffset(page, pageSize)}
                />
              )}
            </>
          ) : (
            <Empty description={"No products in this category"} />
          )}
        </>
      )}
    </div>
  );
};

export default ShopContentProduct;
