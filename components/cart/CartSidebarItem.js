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

const CartSidebarItem = ({ data, userData }) => {
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

  const handleOk = async (id) => {
    const result = await fetch(
      `${process.env.BACKEND_URL}/wp-json/cocart/v2/cart/item/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userData.token}`,
          "Content-Type": "application/json",
        },
      }
    );
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
              data[1].featured_image && data !== undefined
                ? data[1].featured_image
                : "/assets/images/products/clothes/1.png"
            }
            alt="Product image"
          />
        </div>
        <div className="cart-sidebar-item__content">
          <Link href={`/product/[slug]`} as={`/product/${data[1].slug}`}>
            <a>{data[1].name}</a>
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
            ${data[1].price}
          </h5>
          <QuantitySelector
            size="small"
            defaultValue={data[1].quantity.value}
            data={data[1]}
            min={1}
            max={data[1].quantity.max_purchase}
            // onDecrease={() => dispatch(decreaseQuantity(data.id))}
            // onIncrease={() => dispatch(increaseQuantity(data.id))}
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
        onOk={() => handleOk(data[1].item_key)}
        onCancel={handleCancel}
      >
        <p>Are your sure to remove product from cart ?</p>
      </Modal>
    </>
  );
};

export default React.memo(CartSidebarItem);
