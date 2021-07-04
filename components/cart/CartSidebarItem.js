import React, { useState } from "react";
import Link from "next/link";
import { Modal, message } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { formatCurrency } from "../../common/utils";
import QuantitySelector from "../controls/QuantitySelector";
import {
  removeFromCart,
  decreaseQuantityCart,
  increaseQuantityCart,
} from "../../redux/actions/cartActions";

function CartSidebarItem({ data }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [quantity, setQuantity] = useState(data.cartQuantity);
  const globalState = useSelector((state) => state.globalReducer);
  const { currency, locales } = globalState.currency;
  const onRemoveProductFromCart = (e) => {
    e.preventDefault();
    showModal();
  };
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    dispatch(removeFromCart(data.cartId));
    setVisible(false);
    return message.error("Product removed from cart");
  };

  const handleCancel = (e) => {
    setVisible(false);
  };
  return (
    <>
      <div className="cart-sidebar-item">
        <div className="cart-sidebar-item__image">
          <img src={data.thumbImage[0]} alt="Product image" />
        </div>
        <div className="cart-sidebar-item__content">
          <Link
            href={process.env.PUBLIC_URL + `/product/[slug]`}
            as={process.env.PUBLIC_URL + `/product/${data.slug}`}
          >
            <a>{data.name}</a>
          </Link>
          <h5>
            {data.discount
              ? formatCurrency(
                  (data.price - data.discount) * data.cartQuantity,
                  locales,
                  currency
                )
              : formatCurrency(
                  data.price * data.cartQuantity,
                  locales,
                  currency
                )}
          </h5>
          <QuantitySelector
            size="small"
            defaultValue={data.cartQuantity}
            min={1}
            max={data.quantity}
            onDecrease={() => dispatch(decreaseQuantityCart(data.cartId))}
            onIncrease={() => dispatch(increaseQuantityCart(data.cartId))}
          />
        </div>
        <div className="cart-sidebar-item__close">
          <a href="#" onClick={onRemoveProductFromCart}>
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
        <p>Are your sure to remove product from cart ?</p>
      </Modal>
    </>
  );
}

export default React.memo(CartSidebarItem);
