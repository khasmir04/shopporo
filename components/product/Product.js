import Link from "next/link";
import { Rate, Button, Tooltip, Skeleton, message, Modal, Spin } from "antd";
import classNames from "classnames";
import { useState } from "react";
import ShopQuickView from "../shop/ShopQuickView";

const Product = ({ data, productStyle }) => {
  const [visible, setVisible] = useState(false);

  const renderStyleClass = () => {
    const avaialeStyles = ["one", "two", "three"];
    if (avaialeStyles.includes(productStyle)) {
      if (!productStyle || productStyle === "one") {
        return "-style-one";
      } else {
        return "-style-" + productStyle;
      }
    } else {
      return "-style-one";
    }
  };

  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = (e) => {
    setVisible(false);
  };
  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  return (
    <>
      <div className={`product ${renderStyleClass()}`}>
        <div className="product-image">
          <Link
            href={`${process.env.PUBLIC_URL}/product/[slug]`}
            as={`${process.env.PUBLIC_URL}/product/${data.slug}`}
          >
            {/* <a className={classNames({ loading: imageLoading })}> */}
            <a>
              {data.thumbImage &&
                data.thumbImage.map((item, index) => (
                  <img
                    // onLoad={handleImageLoaded}
                    key={index}
                    src={item}
                    alt="Product image"
                  />
                ))}
            </a>
          </Link>
          {/* {imageLoading && (
            <div className="product-image-loading">
              <Spin size="large" />
            </div>
          )} */}
          {/* {renderProductType()} */}
          {productStyle === "two" ? (
            <div className="product-button-group">
              <Tooltip title="Quick view">
                <Button onClick={showModal} type="text">
                  <i className="icon_search" />
                </Button>
              </Tooltip>
              <Tooltip
                // title={
                //   productInWishlist ? "Remove from wishlist" : "Add to wishlist"
                // }
                title={"Add to wishlist"}
              >
                <Button
                  className={`product-atw ${classNames({
                    active: true, //productInWishlist,
                  })}`}
                  type="text"
                  // onClick={() => onAddToWishlist(data)}
                >
                  <i className="icon_heart_alt" />
                </Button>
              </Tooltip>
              <Tooltip title="Add to cart">
                <Button
                  // disabled={avaiableQuantity === 0}
                  disabled={false}
                  type="text"
                  // onClick={() => onAddToCart(data)}
                >
                  <i className="icon_bag_alt" />
                </Button>
              </Tooltip>
            </div>
          ) : null}
          {!productStyle || productStyle === "one" ? (
            <>
              <Tooltip
                placement="left"
                // title={
                //   productInWishlist ? "Remove from wishlist" : "Add to wishlist"
                // }

                title={"Add to wishlist"}
              >
                <Button
                  className={`product-atw ${classNames({
                    // active: productInWishlist,
                    active: false,
                  })}`}
                  type="text"
                  shape="circle"
                  // onClick={() => onAddToWishlist(data)}
                >
                  <i className="icon_heart_alt" />
                </Button>
              </Tooltip>

              <Button onClick={showModal} className="product-qv">
                Quick view
              </Button>
            </>
          ) : null}
        </div>
        <div className="product-content">
          <Link
            href={`${process.env.PUBLIC_URL}/product/[slug]`}
            as={`${process.env.PUBLIC_URL}/product/${data.slug}`}
          >
            <a className="product-name">{data.name}</a>
          </Link>
          <div className="product-rate">
            <Rate defaultValue={data.rate} disabled />
            <span className="product-rate-quantity">(6)</span>
          </div>
          <div className="product-content__footer">
            <div className="product-content__footer-price">
              <h5 className="product-price">
                ${data.discount ? data.price - data.discount : data.price}
              </h5>
              {data.discount && <span>{data.price}</span>}
            </div>
            {!productStyle || productStyle === "one" ? (
              <Tooltip title="Add to cart">
                <Button
                  // disabled={avaiableQuantity === 0}
                  disabled={false}
                  className="product-atc"
                  type="text"
                  shape="circle"
                  // onClick={() => onAddToCart(data)}
                >
                  <i className="icon_bag_alt" />
                </Button>
              </Tooltip>
            ) : null}
          </div>
          {productStyle === "three" ? (
            <div className="product-button-group">
              <div className="product-button-group__wrapper">
                <Tooltip placement="top" title="Quick view">
                  <Button onClick={showModal} shape="circle">
                    <i className="icon_search" />
                  </Button>
                </Tooltip>
                <Tooltip
                  placement="top"
                  // title={
                  //   productInWishlist
                  //     ? "Remove from wishlist"
                  //     : "Add to wishlist"
                  // }

                  title={
                    Math.random() * 10 > 4
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  <Button
                    shape="circle"
                    className={`product-atw ${classNames({
                      active: true,
                      // active: productInWishlist,
                    })}`}
                    // onClick={() => onAddToWishlist(data)}
                  >
                    <i className="icon_heart_alt" />
                  </Button>
                </Tooltip>
                <Tooltip placement="top" title="Add to cart">
                  <Button
                    // disabled={avaiableQuantity === 0}
                    disabled={false}
                    shape="circle"
                    // onClick={() => onAddToCart(data)}
                  >
                    <i className="icon_bag_alt" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Modal
        footer={null}
        afterClose={handleCancel}
        onCancel={handleCancel}
        visible={visible}
        width={850}
      >
        <ShopQuickView setModalVisible={setVisible} data={data} />
      </Modal>
    </>
  );
};

export default Product;
