import { Empty, Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { addToWishList, removeFromWishList } from "../../redux/wishlistSlice";

const ProductDetailOne = ({ data, user }) => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const productInWishlist = wishlistItems.find((item) => item.id === data.id)
    ? true
    : false;

  const onAddToCart = async (id) => {
    try {
      const userInfo = await fetch(
        `${process.env.BACKEND_URL}/wp-json/cocart/v2/cart/add-item`,
        {
          method: "POST",
          body: JSON.stringify({
            id: id,
          }),
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const response = await userInfo.json();
    } catch (error) {
      console.log(error);
    }
  };

  return data ? (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={
              data.images.length > 0 && data !== undefined
                ? data.images[0].src
                : "/assets/images/products/clothes/1.png"
            }
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {data.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <Rate defaultValue={data.average_rating} disabled />
                {/* <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-primary"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-primary"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-primary"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-primary"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-primary"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg> */}
                <span className="text-gray-600 ml-3">
                  {data.rating_count || 0} Reviews
                </span>
              </span>
            </div>
            <p className="leading-relaxed">
              {data.description.slice(3, data.description.length - 5)}
            </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              {/* <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div> */}
              <div className="flex items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    {data &&
                      data.attributes[0].options
                        .map((op) => op)
                        .map((op, index) => (
                          <option value={op} key={index}>
                            {op}
                          </option>
                        ))}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${data.on_sale ? data.sale_price : data.regular_price}
                {data.on_sale && (
                  <span className="text-gray-400 line-through ml-2 text-lg">
                    ${data.regular_price}
                  </span>
                )}
              </span>
              <button
                disabled={data.stock_quantity === 0 || !data.stock_quantity}
                className={`flex ml-auto border-0 py-2 px-6 focus:outline-none rounded transition duration-150 ease-in-out ${
                  data.stock_quantity === 0 || !data.stock_quantity
                    ? "text-gray-500 bg-gray-200 cursor-not-allowed"
                    : "text-white bg-primary hover:bg-primary-dark"
                }`}
                onClick={() => onAddToCart(data.id.toString())}
              >
                {data.stock_quantity === 0 || !data.stock_quantity
                  ? "Sold Out"
                  : "Add to Cart"}
              </button>
              <button
                className={`rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center  ml-4 hover:text-primary-dark ${
                  productInWishlist ? "text-primary-dark" : "text-gray-500"
                } transition duration-150 ease-in-out`}
                onClick={() =>
                  productInWishlist
                    ? dispatch(removeFromWishList(data.id))
                    : dispatch(addToWishList(data))
                }
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Empty description="This page does not exist" />
  );
};

export default ProductDetailOne;
