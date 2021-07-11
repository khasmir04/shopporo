import React, { useState } from "react";
import Link from "next/link";
import { Modal, message } from "antd";
import { useDispatch } from "react-redux";

import { formatCurrency } from "../../common/utils";
import QuantitySelector from "../controls/QuantitySelector";
// import {
//   removeFromCart,
//   decreaseQuantityCart,
//   increaseQuantityCart,
// } from "../../redux/actions/cartActions";
import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/cartSlice";

const CartSidebarItem = ({ data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  // const [quantity, setQuantity] = useState(data.cartQuantity);
  // const globalState = useSelector((state) => state.globalReducer);
  // const { currency, locales } = globalState.currency;
  const onRemoveProductFromCart = (e) => {
    e.preventDefault();
    showModal();
  };
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (id) => {
    dispatch(removeFromCart(id));
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
          <img
            src={
              data.images.length > 0 && data !== undefined
                ? data.images[0].src
                : "/assets/images/products/clothes/1.png"
            }
            alt="Product image"
          />
        </div>
        <div className="cart-sidebar-item__content">
          <Link href={`/product/[slug]`} as={`/product/${data.slug}`}>
            <a>{data.name}</a>
          </Link>
          <h5>
            {/* {data.discount
              ? formatCurrency(
                  (data.price - data.discount) * data.cartQuantity,
                  locales,
                  currency
                )
              : formatCurrency(
                  data.price * data.cartQuantity,
                  locales,
                  currency
                )} */}
            ${data.on_sale ? data.sale_price : data.price}
          </h5>
          <QuantitySelector
            size="small"
            defaultValue={data.qty}
            data={data}
            min={1}
            max={data.stock_quantity}
            onDecrease={() => dispatch(decreaseQuantity(data.id))}
            onIncrease={() => dispatch(increaseQuantity(data.id))}
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
        onOk={() => handleOk(data.id)}
        onCancel={handleCancel}
      >
        <p>Are your sure to remove product from cart ?</p>
      </Modal>
    </>
  );
};

export default React.memo(CartSidebarItem);
