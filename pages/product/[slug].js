import { useRouter } from "next/router";

import LayoutOne from "../../components/layouts/LayoutOne";
import { capitalizeFirstLetter } from "../../common/utils";
import ProductDetailOne from "../../components/productDetail/ProductDetailOne";
import { useEffect, useState } from "react";

export default function pid() {
  const router = useRouter();
  // const { slug } = router.query;
  // const foundProduct = getProductsBySlug(productData, router.query.slug);
  const [foundProduct, setFoundProduct] = useState({});
  const [prod, setProd] = useState(null);

  // Robby
  useEffect(async () => {
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/wp-json/public-woo/v3/products/?slug=${router.query.slug}`,
        {
          method: "GET",
        }
      );

      const result = await res.json();
      // console.log("slug:", router.query.slug, result[0]);

      if (result) setFoundProduct(result[0]);
      setProd(() => result[0]);
    } catch (error) {
      console.log("Fetching products failed:", error);
    }

    return <></>;
  }, []);
  // End Robby

  return (
    <LayoutOne
      title={foundProduct && capitalizeFirstLetter(String(foundProduct.name))}
      clearSpaceTop
    >
      {foundProduct && <ProductDetailOne data={prod} />}
    </LayoutOne>
  );
}
