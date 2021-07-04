import React from "react";
import { Empty } from "antd";
// import { useSelector } from "react-redux";

// import WishlistSidebarItem from "./WishlistSidebarItem";

function WishlistSidebar() {
  // const wishlistState = useSelector((state) => state.wishlistReducer);

  // ADDED THIS TEMPORARILY TO SHOW NO WISHLIST - KHASMIR(Remove when using actual data)
  const wishlistState = "";

  return wishlistState.length === 0 ? (
    <Empty description="No products in wishlist" />
  ) : (
    <div className="wishlist-sidebar">
      {wishlistState.map((item, index) => (
        <WishlistSidebarItem key={index} data={item} />
      ))}
    </div>
  );
}

export default React.memo(WishlistSidebar);
