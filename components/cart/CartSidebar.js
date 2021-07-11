// import { useSelector, useDispatch } from "react-redux";
import { Empty, Button } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import CartSidebarItem from "./CartSidebarItem";
// import { calculateTotalPrice } from "../../common/shopUtils";
// import { formatCurrency } from "../../common/utils";

const CartSidebar = () => {
  const { cartItems } = useSelector((state) => state.cart);

  // const cartState = useSelector((state) => state.cartReducer);
  // const globalState = useSelector((state) => state.globalReducer);
  // const { currency, locales } = globalState.currency;

  // ADDED THIS TEMPORARILY TO SHOW NO PRODUCTS - KHASMIR(Remove when using actual data)
  // const cartState = "";

  return cartItems.length === 0 ? (
    <Empty description="No products in cart" />
  ) : (
    <div className="cart-sidebar">
      <div className="cart-sidebar-products">
        {cartItems.map((item, index) => (
          <CartSidebarItem key={index} data={item} />
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
};

export default CartSidebar;
