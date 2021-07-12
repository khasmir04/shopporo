import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Drawer } from "antd";
// import { useSelector, useDispatch } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";

import productsData from "../../../data/product.json";
import CartSidebar from "../../cart/CartSidebar";

import WishlistSidebar from "../../wishlist/WishlistSidebar";
import MenuSidebar from "./MenuSidebar";
import SearchBar from "./SearchBar";
// import { getTotalProductInCart } from "../../../common/shopUtils";
import Container from "../../other/Container";
import { useSelector } from "react-redux";

const Menu = ({ containerType, userData }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  // const cartState = useSelector((state) => state.cartReducer);
  // const wishlistState = useSelector((state) => state.wishlistReducer);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  // const [menuSidebarOpen, setMenuSidebarOpen] = useState(false);
  const [wishlistSidebarOpen, setWishlistSidebarOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const count = await fetch(
          `${process.env.BACKEND_URL}/wp-json/cocart/v2/cart/items/count`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userData.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const response = await count.json();
        setCartCount(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="menu">
        <Container type={containerType}>
          <div className="menu-wrapper">
            <a
              href="#"
              className="menu-sidebar-opener"
              onClick={(e) => {
                e.preventDefault();
                // setMenuSidebarOpen(true);
              }}
            >
              <div></div>
              <div></div>
              <div></div>
            </a>
            <div className="menu-logo">
              <Link href={"/"}>
                <a>
                  <img src={"/assets/images/logo.png"} alt="Logo" />
                </a>
              </Link>
            </div>
            <SearchBar
              fillData={productsData}
              placeholder="What are you looking for ?"
            />
            <div className="menu-functions">
              {/* <Button>
                <Link href="#">
                  <a>Join now</a>
                </Link>
              </Button> */}
              <div
                className="menu-function-item"
                onClick={() => setWishlistSidebarOpen(true)}
              >
                <img src={"/assets/images/header/menu-wishlist.png"} alt="" />
                <span>{wishlistItems.length || 0}</span>
              </div>
              <div
                className="menu-function-item"
                onClick={() => setCartSidebarOpen(true)}
              >
                <img src={"/assets/images/header/menu-bag.png"} alt="" />
                <span>{cartCount || 0}</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="menu-mobile-search">
        <Container>
          <SearchBar fillData={productsData} placeholder="Searching..." />
        </Container>
      </div>
      <Drawer
        placement="right"
        // ADDED TEMPORARILY, MUST BE REPLACED WITH WISHLISTSTATE LENGTH
        title="Wishlist"
        // {`Wishlist (${wishlistState.length})`}
        closable={true}
        onClose={() => setWishlistSidebarOpen(false)}
        closeIcon={
          <>
            <p>Close</p> <CloseOutlined />
          </>
        }
        visible={wishlistSidebarOpen}
        width={445}
        className="menu-side"
      >
        <WishlistSidebar />
      </Drawer>
      <Drawer
        placement="right"
        // ADDED TEMPORARILY, MUST BE REPLACED WITH TOTALPRODUCTINCART LENGTH
        title="Shopping cart"
        // title={`Shopping cart (${getTotalProductInCart(cartState)})`}
        closable={true}
        onClose={() => setCartSidebarOpen(false)}
        closeIcon={
          <>
            <p>Close</p> <CloseOutlined />
          </>
        }
        visible={cartSidebarOpen}
        width={445}
        className="menu-side"
      >
        <CartSidebar userData={userData} />
      </Drawer>
      <Drawer
        placement="right"
        closable={true}
        title=" "
        // onClose={() => setMenuSidebarOpen(false)}
        closeIcon={
          <>
            <p>Close</p> <CloseOutlined />
          </>
        }
        // visible={menuSidebarOpen}
        width={350}
        className="menu-side"
      >
        <MenuSidebar />
      </Drawer>
    </>
  );
};

export default Menu;
