import React from "react";
import { Empty } from "antd";
import { useSelector } from "react-redux";

import WishlistSidebarItem from "./WishlistSidebarItem";

function WishlistSidebar() {
  const { wishlistItems } = useSelector((state) => state.wishlist);

  // ADDED THIS TEMPORARILY TO SHOW NO WISHLIST - KHASMIR(Remove when using actual data)

  return wishlistItems.length === 0 ? (
    <Empty description="No products in wishlist" />
  ) : (
    <div className="wishlist-sidebar">
      {wishlistItems.map((item, index) => (
        <WishlistSidebarItem key={index} data={item} />
      ))}
    </div>
  );
}

export default React.memo(WishlistSidebar);
