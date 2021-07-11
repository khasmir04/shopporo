import React, { useState } from "react";
import Link from "next/link";
import { Modal, message, Button } from "antd";
import {
  checkAvailableQuantityToAdd,
  checkProductInCart,
} from "../../common/shopUtils";
import { removeFromWishList } from "../../redux/wishlistSlice";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const WishlistSidebarItem = ({ data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  const availableQuantity = checkAvailableQuantityToAdd(cartItems, data);
  const productInCart = checkProductInCart(cartItems, data.id);

  const onRemoveProductFromWishlist = (e) => {
    e.preventDefault();
    showModal();
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    dispatch(removeFromWishList(data.id));
    setVisible(false);
    return message.error("Product removed from wishlist");
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const onAddToCart = () => {
    if (availableQuantity === 0) {
      return;
    }
    dispatch(addToCart(data));
    message.success("Product added to cart successfully");
  };

  return (
    data && (
      <>
        <div className="wishlist-sidebar-item">
          <div className="wishlist-sidebar-item__image">
            <img
              src={
                data.images.length > 0 && data !== undefined
                  ? data.images[0].src
                  : "/assets/images/products/clothes/1.png"
              }
              alt="Product image"
            />
          </div>
          <div className="wishlist-sidebar-item__content">
            <Link href={`/product/[slug]`} as={`/product/${data.slug}`}>
              <a>{data.name}</a>
            </Link>
            <h5>${data.on_sale ? data.sale_price : data.price}</h5>
            {data.stock_quantity < 1 ? (
              <>
                <Button className="btn-sold-mobile" disabled>
                  <i className="icon_close" />
                </Button>
                <Button className="btn-sold" disabled>
                  Sold out
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={onAddToCart}
                  disabled={productInCart}
                  className="btn-atc-mobile"
                >
                  <i className="icon_bag_alt" />
                </Button>
                <Button
                  onClick={onAddToCart}
                  disabled={productInCart}
                  className="btn-atc"
                >
                  {productInCart ? "Added to cart" : "Add to Cart"}
                </Button>
              </>
            )}
          </div>
          <div className="wishlist-sidebar-item__close">
            <a href="#" onClick={onRemoveProductFromWishlist}>
              <i className="icon_close" />
            </a>
          </div>
        </div>
        <Modal
          title="Cofirm this action"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Are your sure to remove product from wishlist ?</p>
        </Modal>
      </>
    )
  );
};

export default React.memo(WishlistSidebarItem);
