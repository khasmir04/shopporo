// import { useSelector } from "react-redux";
// import { useRouter } from "next/router";

import Banners from "../components/shop/Banners";
import LayoutOne from "../components/layouts/LayoutOne";
import ShopLayout from "../components/shop/ShopLayout";
// import productData from "../data/product.json";
// import useProductData from "../common/useProductData";

// logout - khasmir
import Link from "next/link";
import { useRouter } from "next/router"
import { withSession } from "../middlewares/session";
// logout - khasmir

const Home = ({ user }) => {
  // const router = useRouter();
  // const globalState = useSelector((state) => state.globalReducer);
  // const data = useProductData(
  //   productData,
  //   globalState.category,
  //   router.query.q
  // );

  // logout - khasmir
  const router = useRouter();

  const onLogout = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch("/api/logout", {
        method: "POST",
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
    // TOKEN REVOKE
    // try {
    //   await fetch(`${process.env.BACKEND_URL}/?rest_route=/simple-jwt-login/v1/auth/revoke&JWT={{YOUR_JWT}}`,{

    //   })
    // } catch (error) {

    // }
  };
  // logout - khasmir

  // const getDetails = async () => {
  //   try {
  //     const result = await fetch(
  //       `${process.env.BACKEND_URL}/?rest_route=/simple-jwt-login/v1/auth/validate&JWT=${user.data.jwt}`,
  //       {
  //         method: "GET",
  //       },
  //     );
  //   } catch (error) {
  //     console.log("Getting details failed.")
  //   }
  // }

  // console.log(result);
  return (
    <LayoutOne title="Home">
      <h1>Home</h1>
      <div>
        {user ? (
          <p>
            Hello {user.data.jwt}!{" "}
            <a href="/api/logout" onClick={onLogout}>
              Logout
            </a>
          </p>
        ) : (
          <p>
            Hello guest, do you want to{" "}
            <Link href="/login">
              <a>login ?</a>
            </Link>
          </p>
        )}
      </div>
      <Banners />
      <ShopLayout
        fiveColumn
        shopSidebarResponsive={{ xs: 24, lg: 4 }}
        shopContentResponsive={{ xs: 24, lg: 20 }}
        productResponsive={{ xs: 12, sm: 8, md: 6 }}
        productPerPage={15}
      // data={[...data]}
      />
    </LayoutOne>
  );
}

export const getServerSideProps = withSession((context) => {
  const { req } = context;

  return {
    props: {
      user: req.session.get("user") || null,
    },
  };
});

export default Home;