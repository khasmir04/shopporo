import React, { useState } from "react";
import Link from "next/link";
import { Modal, message, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { formatCurrency } from "../../common/utils";
import {
  checkAvaiableQuantityToAdd,
  checkProductInCart,
} from "../../common/shopUtils";
import { removeFromWishlist } from "../../redux/actions/wishlistActions";
import { addToCart } from "../../redux/actions/cartActions";

function WishlistSidebarItem({ data }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const globalState = useSelector((state) => state.globalReducer);
  const cartState = useSelector((state) => state.cartReducer);
  const { currency, locales } = globalState.currency;
  const avaiableQuantity = checkAvaiableQuantityToAdd(cartState, data);
  const productInCart = checkProductInCart(cartState, data.id);
  const onRemoveProductFromWishlist = (e) => {
    e.preventDefault();
    showModal();
  };
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = (e) => {
    dispatch(removeFromWishlist(data.id));
    setVisible(false);
    return message.error("Product removed from wishlist");
  };

  const handleCancel = (e) => {
    setVisible(false);
  };
  const onAddToCart = () => {
    if (avaiableQuantity === 0) {
      return;
    }
    dispatch(addToCart(data));
    message.success("Product added to cart successfully");
  };
  return (
    <>
      <div className="wishlist-sidebar-item">
        <div className="wishlist-sidebar-item__image">
          <img src={data.thumbImage[0]} alt="Product image" />
        </div>
        <div className="wishlist-sidebar-item__content">
          <Link
            href={process.env.PUBLIC_URL + `/product/[slug]`}
            as={process.env.PUBLIC_URL + `/product/${data.slug}`}
          >
            <a>{data.name}</a>
          </Link>
          <h5>
            {data.discount
              ? formatCurrency(data.price - data.discount, locales, currency)
              : formatCurrency(data.price, locales, currency)}
          </h5>
          {data.quantity < 1 ? (
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
  );
}

export default React.memo(WishlistSidebarItem);
