import Link from "next/link";
import { Rate, Button, Tooltip, Skeleton, message, Modal, Spin } from "antd";
import classNames from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopQuickView from "../shop/ShopQuickView";
import { addToCart } from "../../redux/cartSlice";
import { addToWishList, removeFromWishList } from "../../redux/wishlistSlice";
import { withSession } from "../../middlewares/session";

const Product = ({ data, productStyle, user }) => {
  const [visible, setVisible] = useState(false);

  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const renderStyleClass = () => {
    const availableStyles = ["one", "two", "three"];
    if (availableStyles.includes(productStyle)) {
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

  const productInWishlist = wishlistItems.find((item) => item.id === data.id)
    ? true
    : false;

  const onAddToCart = async (id) => {
    try {
      const userInfo = await fetch(
        `${process.env.BACKEND_URL}/wp-json/cocart/v2/cart/add-item`,
        {
          method: "POST",
          body: JSON.stringify({
            id: id,
          }),
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const response = await userInfo.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={`product ${renderStyleClass()}`}>
        <div className="product-image">
          <Link href={`/product/[slug]`} as={`/product/${data.slug}`}>
            <a className="">
              {/* <a className={classNames({ loading: imageLoading })}> */}
              {/* <a> */}
              {data.images.length > 1
                ? data.images.slice(0, 2).map((image, index) => (
                    <img
                      // onLoad={handleImageLoaded}
                      key={index}
                      src={image.src}
                      alt="Product image"
                    />
                  ))
                : [1, 2].map((image, index) => (
                    <img
                      // onLoad={handleImageLoaded}
                      key={index}
                      src={`/assets/images/products/clothes/1.png`}
                      alt="Product image"
                    />
                  ))}

              {/* <img
                // onLoad={handleImageLoaded}
                src={`/assets/images/products/clothes/1.png`}
                alt="Product image"
              /> */}
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
                title={
                  productInWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
                // title={"Add to wishlist"}
              >
                <Button
                  className={`product-atw ${classNames({
                    active: productInWishlist,
                  })}`}
                  type="text"
                  onClick={() =>
                    productInWishlist
                      ? dispatch(removeFromWishList(data.id))
                      : dispatch(addToWishList(data))
                  }
                >
                  <i className="icon_heart_alt" />
                </Button>
              </Tooltip>
              <Tooltip title="Add to cart">
                <Button
                  // disabled={avaiableQuantity === 0}
                  disabled={data.stock_quantity === 0 || !data.stock_quantity}
                  // disabled={false}
                  type="text"
                  // onClick={() => dispatch(addToCart(data))}
                  onClick={() => onAddToCart(data.id.toString())}
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
                title={
                  productInWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <Button
                  className={`product-atw ${classNames({
                    active: productInWishlist,
                  })}`}
                  type="text"
                  shape="circle"
                  onClick={() =>
                    productInWishlist
                      ? dispatch(removeFromWishList(data.id))
                      : dispatch(addToWishList(data))
                  }
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
          <Link href={`/product/[slug]`} as={`/product/${data.slug}`}>
            <a className="product-name">{data.name}</a>
          </Link>
          <div className="product-rate">
            <Rate defaultValue={data.average_rating} disabled />
            <span className="product-rate-quantity">{data.rating_count}</span>
          </div>
          <div className="product-content__footer">
            <div className="product-content__footer-price">
              <h5 className="product-price">
                ${data.on_sale ? data.sale_price : data.price}
              </h5>
              {data.on_sale && <span>{data.price}</span>}
            </div>
            {!productStyle || productStyle === "one" ? (
              <Tooltip title="Add to cart">
                <Button
                  // disabled={avaiableQuantity === 0}
                  disabled={data.stock_quantity === 0 || !data.stock_quantity}
                  // disabled={false}
                  className="product-atc"
                  type="text"
                  shape="circle"
                  // onClick={() => dispatch(addToCart(data))}
                  onClick={() => onAddToCart(data.id.toString())}
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
                  title={
                    productInWishlist
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  <Button
                    shape="circle"
                    className={`product-atw ${classNames({
                      active: productInWishlist,
                    })}`}
                    onClick={() =>
                      productInWishlist
                        ? dispatch(removeFromWishList(data.id))
                        : dispatch(addToWishList(data))
                    }
                  >
                    <i className="icon_heart_alt" />
                  </Button>
                </Tooltip>
                <Tooltip placement="top" title="Add to cart">
                  <Button
                    // disabled={avaiableQuantity === 0}
                    disabled={data.stock_quantity === 0 || !data.stock_quantity}
                    // disabled={false}
                    shape="circle"
                    // onClick={() => dispatch(addToCart(data))}
                    onClick={() => onAddToCart(data.id.toString())}
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

// export const getServerSideProps = withSession((context) => {
//   const { req } = context;

//   return {
//     props: {
//       user: req.session.get("user") || null,
//     },
//   };
// });

export default Product;
