// import { useSelector, useDispatch } from "react-redux";
import { Empty, Button } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CartSidebarItem from "./CartSidebarItem";
// import { calculateTotalPrice } from "../../common/shopUtils";
// import { formatCurrency } from "../../common/utils";

const CartSidebar = ({ userData }) => {
  // const { cartItems } = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [cartDataLoaded, setCartDataLoaded] = useState(false);

  const fetchData = async () => {
    try {
      const result = await fetch(
        `${process.env.BACKEND_URL}/wp-json/cocart/v2/cart/items`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userData.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await result.json();
      // setCartItems(cartItems.push(data));
      cartItems.push(...Object.entries(data));
      console.log(cartItems);
      if (data) setCartDataLoaded(true);
    } catch (error) {}
  };

  useEffect(() => {
    if (!cartDataLoaded) {
      fetchData();
    }
  }, []);

  // const cartState = useSelector((state) => state.cartReducer);
  // const globalState = useSelector((state) => state.globalReducer);
  // const { currency, locales } = globalState.currency;

  // ADDED THIS TEMPORARILY TO SHOW NO PRODUCTS - KHASMIR(Remove when using actual data)
  // const cartState = "";

  // return <></>;

  // return cartItems.length === 0 ? (
  //   <Empty description="No products in cart" />
  // ) : (
  return (
    <div className="cart-sidebar">
      <div className="cart-sidebar-products">
        {cartItems.map((item, index) => (
          <CartSidebarItem key={index} data={item} userData={userData} />
        ))}
      </div>
      <div className="cart-sidebar-total">
        <h5>
          Total:{" "}
          <span>
            {/* {formatCurrency(calculateTotalPrice(cartState), locales, currency)} */}
          </span>
        </h5>
        <div className="cart-sidebar-total__buttons">
          <Button type="primary" shape="round">
            <Link href={"/shop/checkout"}>
              <a>Checkout</a>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );

  // );
};

export default CartSidebar;
