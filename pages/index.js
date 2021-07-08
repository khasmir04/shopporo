// import { useSelector } from "react-redux";
// import { useRouter } from "next/router";

import Banners from "../components/shop/Banners";
import LayoutOne from "../components/layouts/LayoutOne";
import ShopLayout from "../components/shop/ShopLayout";
// import productData from "../data/product.json";
// import useProductData from "../common/useProductData";

// logout - khasmir
import Link from "next/link";
import { useRouter } from "next/router";
import { withSession } from "../middlewares/session";
import { useState, useEffect } from "react";
// logout - khasmir

const Home = ({ user }) => {
  // const router = useRouter();
  // const globalState = useSelector((state) => state.globalReducer);
  // const data = useProductData(
  //   productData,
  //   globalState.category,
  //   router.query.q
  // );

  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  let sampleRes;

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/wp-json/public-woo/v3/products`,
        {
          method: "GET",
        }
      );

      // const productReportTotal = await fetch(
      //   `${process.env.BACKEND_URL}/wp-json/public-woo/v2/reports/products/totals`,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: "Bearer ",
      //     },
      //   }
      // );

      // console.log("Res:", res.headers.get("x-wp-total"));
      const result = await res.json();
      // sampleRes = res.headers["x-wp-total"];
      console.log(result);
      // setData(() => [...result]);
    } catch (error) {
      console.log("Fetching products failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  const getData = async (offSet) => {
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/wp-json/public-woo/v3/products/?per_page=16&offset=${offSet}`,
        {
          method: "GET",
        }
      );

      const result = await res.json();

      // setProducts(result);
    } catch (error) {
      console.log("Fetching products failed:", error);
    }
  };

  // // logout - khasmir
  // const router = useRouter();

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
  };

  // logout - khasmir

  const getDetails = async () => {
    try {
      const result = await fetch(
        `${process.env.BACKEND_URL}/?rest_route=/simple-jwt-login/v1/auth/validate&JWT=${user.data.jwt}`,
        {
          method: "GET",
        }
      );
    } catch (error) {
      console.log("Getting details failed.");
    }
  };

  // console.log(result);

  /*
  const data = [
    {
      id: "1",
      category: "clothing",
      subCategory: "coat",
      name: "Jack & Jones Men's T-Shirt",
      rate: 4,
      reviewCount: 10,
      price: 59.99,
      discount: 20,
      new: true,
      quantity: 8,
      sex: "men",
      size: [
        {
          name: "XXL",
        },
        {
          name: "XL",
        },
        {
          name: "L",
        },
      ],
      thumbImage: [
        "/assets/images/products/clothes/1.png",
        "/assets/images/products/clothes/2.png",
      ],
      images: [
        "/assets/images/products/clothes/1.png",
        "/assets/images/products/clothes/2.png",
        "/assets/images/products/clothes/3.png",
        "/assets/images/products/clothes/4.png",
      ],
      description: "",
      slug: "jack-jones-mens-t-shirt-1",
    },
    {
      id: "2",
      category: "clothing",
      subCategory: "coat",
      name: "Fold Over Collar Plain Blazers",
      rate: 5,
      price: 84,
      quantity: 6,
      isNew: true,
      sex: "men",
      variation: [
        {
          color: "red",
          colorCode: "#8B0000",
        },
        {
          color: "blue",
          colorCode: "#4169E1",
        },
      ],
      thumbImage: [
        "/assets/images/products/clothes/2.png",
        "/assets/images/products/clothes/3.png",
      ],
      images: [
        "/assets/images/products/clothes/2.png",
        "/assets/images/products/clothes/3.png",
        "/assets/images/products/clothes/4.png",
        "/assets/images/products/clothes/5.png",
      ],
      description: "",
      slug: "fold-over-collar-plain-blazers-2",
    },
    {
      id: "3",
      category: "clothing",
      subCategory: "shirt",
      name: "ivory Check Longline Tunic Shirt",
      rate: 5,
      price: 69,
      quantity: 12,
      sex: "men",
      size: [
        {
          name: "XXL",
        },
        {
          name: "XL",
        },
        {
          name: "L",
        },
      ],
      variation: [
        {
          color: "red",
          colorCode: "#8B0000",
        },
        {
          color: "blue",
          colorCode: "#4169E1",
        },
      ],
      thumbImage: [
        "/assets/images/products/clothes/3.png",
        "/assets/images/products/clothes/4.png",
      ],
      images: [
        "/assets/images/products/clothes/3.png",
        "/assets/images/products/clothes/4.png",
        "/assets/images/products/clothes/5.png",
        "/assets/images/products/clothes/6.png",
      ],
      description: "",
      slug: "ivory-check-longline-tunic-shirt-3",
    },
    {
      id: "4",
      category: "clothing",
      subCategory: "pants",
      name: "Vero Moda Coco Wide Pant",
      rate: 3,
      price: 36,
      quantity: 4,
      sex: "men",
      thumbImage: [
        "/assets/images/products/clothes/5.png",
        "/assets/images/products/clothes/6.png",
      ],
      images: [
        "/assets/images/products/clothes/5.png",
        "/assets/images/products/clothes/6.png",
        "/assets/images/products/clothes/7.png",
        "/assets/images/products/clothes/8.png",
      ],
      description: "",
      slug: "vero-moda-coco-wide-pant-4",
    },
    {
      id: "5",
      category: "clothing",
      subCategory: "suits",
      name: "Boxy Cardigan",
      rate: 4,
      price: 72,
      discount: 13,
      quantity: 9,
      sex: "women",
      thumbImage: [
        "/assets/images/products/clothes/7.png",
        "/assets/images/products/clothes/8.png",
      ],
      images: [
        "/assets/images/products/clothes/7.png",
        "/assets/images/products/clothes/8.png",
        "/assets/images/products/clothes/9.png",
        "/assets/images/products/clothes/10.png",
      ],
      description: "",
      slug: "boxy-cardigan-5",
    },
    {
      id: "6",
      category: "clothing",
      subCategory: "dress",
      name: "New now committed brothers & sisters",
      rate: 5,
      price: 69,
      quantity: 9,
      sex: "women",
      thumbImage: [
        "/assets/images/products/clothes/8.png",
        "/assets/images/products/clothes/9.png",
      ],
      images: [
        "/assets/images/products/clothes/8.png",
        "/assets/images/products/clothes/9.png",
        "/assets/images/products/clothes/10.png",
        "/assets/images/products/clothes/11.png",
      ],
      description: "",
      slug: "new-now-committed-brothers-sisters-6",
    },
    {
      id: "7",
      category: "clothing",
      subCategory: "shorts",
      name: "Scotch Soda Skim Jeans",
      rate: 5,
      price: 29,
      isNew: true,
      quantity: 0,
      sex: "women",
      thumbImage: [
        "/assets/images/products/clothes/9.png",
        "/assets/images/products/clothes/10.png",
      ],
      images: [
        "/assets/images/products/clothes/9.png",
        "/assets/images/products/clothes/10.png",
        "/assets/images/products/clothes/11.png",
        "/assets/images/products/clothes/12.png",
      ],
      description: "",
      slug: "scotch-soda-skim-jeans-7",
    },
    {
      id: "8",
      category: "clothing",
      subCategory: "dress",
      name: "Champion dress",
      rate: 4,
      price: 35,
      quantity: 16,
      sex: "men",
      thumbImage: [
        "/assets/images/products/clothes/10.png",
        "/assets/images/products/clothes/11.png",
      ],
      images: [
        "/assets/images/products/clothes/10.png",
        "/assets/images/products/clothes/11.png",
        "/assets/images/products/clothes/12.png",
        "/assets/images/products/clothes/13.png",
      ],
      description: "",
      slug: "champion-dress-8",
    },
    {
      id: "9",
      category: "clothing",
      subCategory: "suits",
      name: "Solid Notch Lapel Single Button Long Sleeve Blazer",
      rate: 5,
      price: 75,
      quantity: 6,
      sex: "men",
      thumbImage: [
        "/assets/images/products/clothes/11.png",
        "/assets/images/products/clothes/12.png",
      ],
      images: [
        "/assets/images/products/clothes/11.png",
        "/assets/images/products/clothes/12.png",
        "/assets/images/products/clothes/13.png",
        "/assets/images/products/clothes/14.png",
      ],
      description: "",
      slug: "solid-notch-lapel-single-button-long-sleeve-blazer-9",
    },
    {
      id: "10",
      category: "clothing",
      subCategory: "shirt",
      name: "Levi'S Western Denim Shirt",
      rate: 5,
      price: 37,
      quantity: 25,
      sex: "men",
      thumbImage: [
        "/assets/images/products/clothes/12.png",
        "/assets/images/products/clothes/13.png",
      ],
      images: [
        "/assets/images/products/clothes/12.png",
        "/assets/images/products/clothes/13.png",
        "/assets/images/products/clothes/14.png",
        "/assets/images/products/clothes/15.png",
      ],
      description: "",
      slug: "levis-western-denim-shirt-10",
    },
    {
      id: "11",
      category: "clothing",
      subCategory: "jacket",
      name: "Loap Infery Kids Winter Jacket",
      rate: 5,
      price: 37,
      quantity: 25,
      sex: "men",
      thumbImage: [
        "/assets/images/products/clothes/13.png",
        "/assets/images/products/clothes/14.png",
      ],
      images: [
        "/assets/images/products/clothes/13.png",
        "/assets/images/products/clothes/14.png",
        "/assets/images/products/clothes/15.png",
        "/assets/images/products/clothes/16.png",
      ],
      description: "",
      slug: "loap-infery-kids-winter-jacket-11",
    },
    {
      id: "12",
      category: "clothing",
      subCategory: "pants",
      name: "Richtan Hero",
      rate: 4,
      price: 22,
      quantity: 30,
      isNew: true,
      sex: "men",
      thumbImage: [
        "/assets/images/products/clothes/14.png",
        "/assets/images/products/clothes/15.png",
      ],
      images: [
        "/assets/images/products/clothes/14.png",
        "/assets/images/products/clothes/15.png",
        "/assets/images/products/clothes/16.png",
        "/assets/images/products/clothes/17.png",
      ],
      description: "",
      slug: "richtan-hero-12",
    },
    {
      id: "13",
      category: "clothing",
      subCategory: "suits",
      name: "David Jones",
      rate: 5,
      price: 78,
      quantity: 3,
      sex: "men",
      thumbImage: [
        "/assets/images/products/clothes/15.png",
        "/assets/images/products/clothes/16.png",
      ],
      images: [
        "/assets/images/products/clothes/15.png",
        "/assets/images/products/clothes/16.png",
        "/assets/images/products/clothes/17.png",
        "/assets/images/products/clothes/18.png",
      ],
      description: "",
      slug: "david-jones-13",
    },
    {
      id: "14",
      category: "clothing",
      subCategory: "dress",
      name: "Basic Hollow Out Flared Midi Skirt",
      rate: 3,
      price: 22,
      quantity: 18,
      sex: "men",
      thumbImage: [
        "/assets/images/products/clothes/16.png",
        "/assets/images/products/clothes/17.png",
      ],
      images: [
        "/assets/images/products/clothes/16.png",
        "/assets/images/products/clothes/17.png",
        "/assets/images/products/clothes/18.png",
        "/assets/images/products/clothes/19.png",
      ],
      description: "",
      slug: "basic-hollow-out-flared-midi-skirt-14",
    },
    {
      id: "15",
      category: "clothing",
      subCategory: "shorts",
      name: "Plain Midi Flared Skirts",
      rate: 3,
      price: 22,
      quantity: 18,
      discount: 4,
      sex: "men",
      thumbImage: [
        "/assets/images/products/clothes/17.png",
        "/assets/images/products/clothes/18.png",
      ],
      images: [
        "/assets/images/products/clothes/17.png",
        "/assets/images/products/clothes/18.png",
        "/assets/images/products/clothes/19.png",
        "/assets/images/products/clothes/20.png",
      ],
      description: "",
      slug: "plain-midi-flared-skirts-15",
    },
    {
      id: "16",
      category: "clothing",
      subCategory: "shirt",
      name: "Lapel Zips Plain Long Sleeve Jackets",
      rate: 5,
      price: 36,
      quantity: 6,
      sex: "men",
      thumbImage: [
        "/assets/images/products/clothes/18.png",
        "/assets/images/products/clothes/19.png",
      ],
      images: [
        "/assets/images/products/clothes/18.png",
        "/assets/images/products/clothes/19.png",
        "/assets/images/products/clothes/20.png",
        "/assets/images/products/clothes/1.png",
      ],
      description: "",
      slug: "lapel-zips-plain-long-sleeve-jackets-16",
    },
    {
      id: "17",
      category: "fruits",
      subCategory: "vegatables",
      name: "Onion",
      rate: 5,
      price: 12,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/fruits/1.png",
        "/assets/images/products/fruits/2.png",
      ],
      images: [
        "/assets/images/products/fruits/1.png",
        "/assets/images/products/fruits/2.png",
        "/assets/images/products/fruits/3.png",
        "/assets/images/products/fruits/4.png",
      ],
      description: "",
      slug: "onion-17",
    },
    {
      id: "18",
      category: "fruits",
      subCategory: "vegatables",
      name: "Samba onion",
      rate: 5,
      price: 12,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/fruits/2.png",
        "/assets/images/products/fruits/3.png",
      ],
      images: [
        "/assets/images/products/fruits/2.png",
        "/assets/images/products/fruits/3.png",
        "/assets/images/products/fruits/4.png",
        "/assets/images/products/fruits/5.png",
      ],
      description: "",
      slug: "samba-onion-18",
    },
    {
      id: "19",
      category: "fruits",
      subCategory: "vegatables",
      name: "tomato",
      rate: 4,
      price: 8,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/fruits/3.png",
        "/assets/images/products/fruits/4.png",
      ],
      images: [
        "/assets/images/products/fruits/3.png",
        "/assets/images/products/fruits/4.png",
        "/assets/images/products/fruits/5.png",
        "/assets/images/products/fruits/6.png",
      ],
      description: "",
      slug: "tomato-19",
    },
    {
      id: "20",
      category: "fruits",
      subCategory: "fruits",
      name: "potatoes",
      rate: 5,
      price: 12,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/fruits/4.png",
        "/assets/images/products/fruits/5.png",
      ],
      images: [
        "/assets/images/products/fruits/4.png",
        "/assets/images/products/fruits/5.png",
        "/assets/images/products/fruits/6.png",
        "/assets/images/products/fruits/7.png",
      ],
      description: "",
      slug: "potatoes-20",
    },
    {
      id: "21",
      category: "fruits",
      subCategory: "vegatables",
      name: "lady finger",
      rate: 3,
      price: 6,
      quantity: 15,
      thumbImage: [
        "/assets/images/products/fruits/5.png",
        "/assets/images/products/fruits/6.png",
      ],
      images: [
        "/assets/images/products/fruits/5.png",
        "/assets/images/products/fruits/6.png",
        "/assets/images/products/fruits/7.png",
        "/assets/images/products/fruits/8.png",
      ],
      description: "",
      slug: "lady-finger-21",
    },
    {
      id: "22",
      category: "fruits",
      subCategory: "vegatables",
      name: "gingerbone",
      rate: 4,
      price: 10,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/fruits/6.png",
        "/assets/images/products/fruits/7.png",
      ],
      images: [
        "/assets/images/products/fruits/6.png",
        "/assets/images/products/fruits/7.png",
        "/assets/images/products/fruits/8.png",
        "/assets/images/products/fruits/9.png",
      ],
      description: "",
      slug: "gingerbone-22",
    },
    {
      id: "23",
      category: "fruits",
      subCategory: "fruits",
      name: "lemon",
      rate: 5,
      price: 5,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/fruits/7.png",
        "/assets/images/products/fruits/8.png",
      ],
      images: [
        "/assets/images/products/fruits/7.png",
        "/assets/images/products/fruits/8.png",
        "/assets/images/products/fruits/9.png",
        "/assets/images/products/fruits/10.png",
      ],
      description: "",
      slug: "lemon-23",
    },
    {
      id: "24",
      category: "fruits",
      subCategory: "fruits",
      name: "pear",
      rate: 4,
      price: 10,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/fruits/8.png",
        "/assets/images/products/fruits/9.png",
      ],
      images: [
        "/assets/images/products/fruits/8.png",
        "/assets/images/products/fruits/9.png",
        "/assets/images/products/fruits/10.png",
        "/assets/images/products/fruits/11.png",
      ],
      description: "",
      slug: "pear-24",
    },
    {
      id: "25",
      category: "fruits",
      subCategory: "vegatables",
      name: "Green capsicum",
      rate: 5,
      price: 13,
      quantity: 9,
      thumbImage: [
        "/assets/images/products/fruits/9.png",
        "/assets/images/products/fruits/10.png",
      ],
      images: [
        "/assets/images/products/fruits/9.png",
        "/assets/images/products/fruits/10.png",
        "/assets/images/products/fruits/11.png",
        "/assets/images/products/fruits/12.png",
      ],
      description: "",
      slug: "green-capsicum-25",
    },
    {
      id: "26",
      category: "fruits",
      subCategory: "vegatables",
      name: "Garlic",
      rate: 5,
      price: 5,
      quantity: 26,
      thumbImage: [
        "/assets/images/products/fruits/10.png",
        "/assets/images/products/fruits/11.png",
      ],
      images: [
        "/assets/images/products/fruits/10.png",
        "/assets/images/products/fruits/11.png",
        "/assets/images/products/fruits/12.png",
        "/assets/images/products/fruits/12.png",
      ],
      description: "",
      slug: "garlic-26",
    },
    {
      id: "27",
      category: "fruits",
      subCategory: "nut",
      name: "coconut",
      rate: 5,
      price: 20,
      quantity: 30,
      thumbImage: [
        "/assets/images/products/fruits/11.png",
        "/assets/images/products/fruits/12.png",
      ],
      images: [
        "/assets/images/products/fruits/11.png",
        "/assets/images/products/fruits/12.png",
        "/assets/images/products/fruits/13.png",
        "/assets/images/products/fruits/14.png",
      ],
      description: "",
      slug: "coconut-27",
    },
    {
      id: "28",
      category: "fruits",
      subCategory: "fruits",
      name: "Watermelon",
      rate: 4,
      price: 22,
      discount: 2,
      quantity: 17,
      thumbImage: [
        "/assets/images/products/fruits/12.png",
        "/assets/images/products/fruits/13.png",
      ],
      images: [
        "/assets/images/products/fruits/12.png",
        "/assets/images/products/fruits/13.png",
        "/assets/images/products/fruits/14.png",
        "/assets/images/products/fruits/15.png",
      ],
      description: "",
      slug: "watermelon-28",
    },
    {
      id: "29",
      category: "fruits",
      subCategory: "vegatables",
      name: "bitter melon",
      rate: 4,
      price: 11,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/fruits/13.png",
        "/assets/images/products/fruits/14.png",
      ],
      images: [
        "/assets/images/products/fruits/13.png",
        "/assets/images/products/fruits/14.png",
        "/assets/images/products/fruits/15.png",
        "/assets/images/products/fruits/16.png",
      ],
      description: "",
      slug: "bitter-melon-29",
    },
    {
      id: "30",
      category: "fruits",
      subCategory: "fruits",
      name: "Mango",
      rate: 5,
      price: 26,
      discount: 5,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/fruits/14.png",
        "/assets/images/products/fruits/15.png",
      ],
      images: [
        "/assets/images/products/fruits/14.png",
        "/assets/images/products/fruits/15.png",
        "/assets/images/products/fruits/16.png",
        "/assets/images/products/fruits/17.png",
      ],
      description: "",
      slug: "mango-30",
    },
    {
      id: "31",
      category: "fruits",
      subCategory: "fruits",
      name: "Pomegranate",
      rate: 4,
      price: 11,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/fruits/15.png",
        "/assets/images/products/fruits/16.png",
      ],
      images: [
        "/assets/images/products/fruits/15.png",
        "/assets/images/products/fruits/16.png",
        "/assets/images/products/fruits/17.png",
        "/assets/images/products/fruits/18.png",
      ],
      description: "",
      slug: "pomegranate-31",
    },
    {
      id: "32",
      category: "fruits",
      subCategory: "vegatables",
      name: "Cabbage",
      rate: 3,
      price: 16,
      quantity: 20,
      thumbImage: [
        "/assets/images/products/fruits/16.png",
        "/assets/images/products/fruits/17.png",
      ],
      images: [
        "/assets/images/products/fruits/16.png",
        "/assets/images/products/fruits/17.png",
        "/assets/images/products/fruits/18.png",
        "/assets/images/products/fruits/19.png",
      ],
      description: "",
      slug: "cabbage-32",
    },
    {
      id: "33",
      category: "fruits",
      subCategory: "fruits",
      name: "Orange",
      rate: 5,
      price: 13,
      isNew: true,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/fruits/17.png",
        "/assets/images/products/fruits/18.png",
      ],
      images: [
        "/assets/images/products/fruits/17.png",
        "/assets/images/products/fruits/18.png",
        "/assets/images/products/fruits/19.png",
        "/assets/images/products/fruits/20.png",
      ],
      description: "",
      slug: "pomegranate-31",
    },
    {
      id: "34",
      category: "fruits",
      subCategory: "vegatables",
      name: "Cauliflower",
      rate: 4,
      price: 23,
      quantity: 8,
      thumbImage: [
        "/assets/images/products/fruits/18.png",
        "/assets/images/products/fruits/19.png",
      ],
      images: [
        "/assets/images/products/fruits/18.png",
        "/assets/images/products/fruits/19.png",
        "/assets/images/products/fruits/20.png",
        "/assets/images/products/fruits/1.png",
      ],
      description: "",
      slug: "cauliflower-34",
    },
    {
      id: "35",
      category: "electronic",
      subCategory: "fridge",
      name: "Panasonic Inverter",
      rate: 4,
      price: 356,
      quantity: 8,
      thumbImage: [
        "/assets/images/products/electronic/1.png",
        "/assets/images/products/electronic/2.png",
      ],
      images: [
        "/assets/images/products/electronic/1.png",
        "/assets/images/products/electronic/2.png",
        "/assets/images/products/electronic/3.png",
        "/assets/images/products/electronic/4.png",
      ],
      description: "",
      slug: "panasonic-inverter-35",
    },
    {
      id: "36",
      category: "electronic",
      subCategory: "tv",
      name: "LG Smart Tv 4k 55 inch",
      rate: 4,
      price: 399,
      discount: 50,
      quantity: 8,
      thumbImage: [
        "/assets/images/products/electronic/2.png",
        "/assets/images/products/electronic/3.png",
      ],
      images: [
        "/assets/images/products/electronic/2.png",
        "/assets/images/products/electronic/3.png",
        "/assets/images/products/electronic/4.png",
        "/assets/images/products/electronic/5.png",
      ],
      description: "",
      slug: "lg-smart-tv-4k-55-inch-36",
    },
    {
      id: "37",
      category: "electronic",
      subCategory: "tv",
      name: "Samsung Smart Tv 4K 55 inch",
      rate: 5,
      price: 599,
      quantity: 10,
      thumbImage: [
        "/assets/images/products/electronic/3.png",
        "/assets/images/products/electronic/4.png",
      ],
      images: [
        "/assets/images/products/electronic/3.png",
        "/assets/images/products/electronic/4.png",
        "/assets/images/products/electronic/5.png",
        "/assets/images/products/electronic/6.png",
      ],
      description: "",
      slug: "samsung-smart-tv-4k-55-inch-37",
    },
    {
      id: "38",
      category: "electronic",
      subCategory: "phone",
      name: "Apple iphone 11 pro max",
      rate: 4,
      price: 356,
      quantity: 8,
      thumbImage: [
        "/assets/images/products/electronic/4.png",
        "/assets/images/products/electronic/5.png",
      ],
      images: [
        "/assets/images/products/electronic/4.png",
        "/assets/images/products/electronic/5.png",
        "/assets/images/products/electronic/6.png",
        "/assets/images/products/electronic/7.png",
      ],
      description: "",
      slug: "apple-iphone-11-pro-max-38",
    },
    {
      id: "39",
      category: "electronic",
      subCategory: "phone",
      name: "Apple iphone 6s",
      rate: 5,
      price: 299,
      quantity: 13,
      thumbImage: [
        "/assets/images/products/electronic/5.png",
        "/assets/images/products/electronic/6.png",
      ],
      images: [
        "/assets/images/products/electronic/5.png",
        "/assets/images/products/electronic/6.png",
        "/assets/images/products/electronic/7.png",
        "/assets/images/products/electronic/8.png",
      ],
      description: "",
      slug: "apple-iphone-6s-39",
    },
    {
      id: "40",
      category: "electronic",
      subCategory: "fridge",
      name: "Bosch 7 kg Fully-Automatic Front Loading Washing Machine",
      rate: 4,
      price: 799,
      isNew: true,
      quantity: 12,
      thumbImage: [
        "/assets/images/products/electronic/6.png",
        "/assets/images/products/electronic/7.png",
      ],
      images: [
        "/assets/images/products/electronic/6.png",
        "/assets/images/products/electronic/7.png",
        "/assets/images/products/electronic/8.png",
        "/assets/images/products/electronic/9.png",
      ],
      description: "",
      slug: "bosch-7-kg-fully-automatic-front-loading-washing-machine-40",
    },
    {
      id: "41",
      category: "electronic",
      subCategory: "air conditioning",
      name: "Split Wall Mounted Air Conditioner 12000 Btu With Led",
      rate: 3,
      price: 459,
      quantity: 8,
      thumbImage: [
        "/assets/images/products/electronic/7.png",
        "/assets/images/products/electronic/8.png",
      ],
      images: [
        "/assets/images/products/electronic/7.png",
        "/assets/images/products/electronic/8.png",
        "/assets/images/products/electronic/9.png",
        "/assets/images/products/electronic/10.png",
      ],
      description: "",
      slug: "split-wall-mounted-air-conditioner-12000-btu-with-led-41",
    },
    {
      id: "42",
      category: "electronic",
      subCategory: "fan",
      name: "Challenge Black Oscillating Desk Fan",
      rate: 5,
      price: 199,
      quantity: 13,
      thumbImage: [
        "/assets/images/products/electronic/8.png",
        "/assets/images/products/electronic/9.png",
      ],
      images: [
        "/assets/images/products/electronic/8.png",
        "/assets/images/products/electronic/9.png",
        "/assets/images/products/electronic/10.png",
        "/assets/images/products/electronic/11.png",
      ],
      description: "",
      slug: "challenge-black-oscillating-desk-fan-42",
    },
    {
      id: "43",
      category: "electronic",
      subCategory: "fan",
      name: "Lasko Adjustable-Height 16",
      rate: 3,
      price: 215,
      quantity: 8,
      thumbImage: [
        "/assets/images/products/electronic/9.png",
        "/assets/images/products/electronic/10.png",
      ],
      images: [
        "/assets/images/products/electronic/9.png",
        "/assets/images/products/electronic/10.png",
        "/assets/images/products/electronic/11.png",
        "/assets/images/products/electronic/12.png",
      ],
      description: "",
      slug: "lasko-adjustable-height-16-43",
    },
    {
      id: "44",
      category: "electronic",
      subCategory: "speaker",
      name: "JBL Link Music Bluetooth Speaker",
      rate: 5,
      price: 239,
      quantity: 4,
      thumbImage: [
        "/assets/images/products/electronic/10.png",
        "/assets/images/products/electronic/11.png",
      ],
      images: [
        "/assets/images/products/electronic/10.png",
        "/assets/images/products/electronic/11.png",
        "/assets/images/products/electronic/12.png",
        "/assets/images/products/electronic/13.png",
      ],
      description: "",
      slug: "jbl-link-music-bluetooth-speaker-44",
    },
    {
      id: "45",
      category: "electronic",
      subCategory: "speaker",
      name: "Sony High Power XB60 Portable Bluetooth Speaker",
      rate: 5,
      price: 199,
      quantity: 23,
      thumbImage: [
        "/assets/images/products/electronic/11.png",
        "/assets/images/products/electronic/12.png",
      ],
      images: [
        "/assets/images/products/electronic/11.png",
        "/assets/images/products/electronic/12.png",
        "/assets/images/products/electronic/13.png",
        "/assets/images/products/electronic/14.png",
      ],
      description: "",
      slug: "sony-high-power-xb60-portable-bluetooth-speaker-45",
    },
    {
      id: "46",
      category: "electronic",
      subCategory: "speaker",
      name: "Sony Wireless Headphones WH-CH510",
      rate: 4,
      price: 267,
      quantity: 17,
      thumbImage: [
        "/assets/images/products/electronic/12.png",
        "/assets/images/products/electronic/13.png",
      ],
      images: [
        "/assets/images/products/electronic/14.png",
        "/assets/images/products/electronic/15.png",
        "/assets/images/products/electronic/16.png",
        "/assets/images/products/electronic/17.png",
      ],
      description: "",
      slug: "sony-wireless-headphones-wh-ch510",
    },
    {
      id: "47",
      category: "electronic",
      subCategory: "speaker",
      name: "Wired Exclusive Smart Design Sony Headphones",
      rate: 5,
      price: 145,
      quantity: 11,
      isNew: true,
      thumbImage: [
        "/assets/images/products/electronic/13.png",
        "/assets/images/products/electronic/14.png",
      ],
      images: [
        "/assets/images/products/electronic/13.png",
        "/assets/images/products/electronic/14.png",
        "/assets/images/products/electronic/15.png",
        "/assets/images/products/electronic/16.png",
      ],
      description: "",
      slug: "wired-exclusive-smart-design-sony-headphones-47",
    },
    {
      id: "48",
      category: "electronic",
      subCategory: "fridge",
      name: "Playstation 4 pro edition",
      rate: 5,
      price: 365,
      quantity: 8,
      thumbImage: [
        "/assets/images/products/electronic/14.png",
        "/assets/images/products/electronic/15.png",
      ],
      images: [
        "/assets/images/products/electronic/14.png",
        "/assets/images/products/electronic/15.png",
        "/assets/images/products/electronic/16.png",
        "/assets/images/products/electronic/17.png",
      ],
      description: "",
      slug: "playstation-4-pro-edition-48",
    },
    {
      id: "49",
      category: "electronic",
      subCategory: "speaker",
      name: "Sony High Power XB60 Portable Bluetooth Speaker",
      rate: 5,
      price: 199,
      quantity: 23,
      thumbImage: [
        "/assets/images/products/electronic/15.png",
        "/assets/images/products/electronic/16.png",
      ],
      images: [
        "/assets/images/products/electronic/15.png",
        "/assets/images/products/electronic/16.png",
        "/assets/images/products/electronic/17.png",
        "/assets/images/products/electronic/18.png",
      ],
      description: "",
      slug: "sony-high-power-xb60-portable-bluetooth-speaker-45",
    },
    {
      id: "50",
      category: "electronic",
      subCategory: "speaker",
      name: "Nintendo Switch Lite Turquoise",
      rate: 5,
      price: 229,
      quantity: 16,
      discount: 15,
      thumbImage: [
        "/assets/images/products/electronic/16.png",
        "/assets/images/products/electronic/17.png",
      ],
      images: [
        "/assets/images/products/electronic/16.png",
        "/assets/images/products/electronic/17.png",
        "/assets/images/products/electronic/18.png",
        "/assets/images/products/electronic/19.png",
      ],
      description: "",
      slug: "nintendo-switch-lite-turquoise-50",
    },
    {
      id: "51",
      category: "electronic",
      subCategory: "phone",
      name: "Eureka PowerSpeed Bagless Upright Vacuum Cleaner",
      rate: 4,
      price: 399,
      quantity: 4,
      thumbImage: [
        "/assets/images/products/electronic/17.png",
        "/assets/images/products/electronic/18.png",
      ],
      images: [
        "/assets/images/products/electronic/17.png",
        "/assets/images/products/electronic/18.png",
        "/assets/images/products/electronic/19.png",
        "/assets/images/products/electronic/20.png",
      ],
      description: "",
      slug: "eureka-powerspeed-bagless-upright-vacuum-cleaner",
    },
    {
      id: "52",
      category: "electronic",
      subCategory: "speaker",
      name: "sailing smart robot vacuum cleaner powerful",
      rate: 5,
      price: 199,
      quantity: 23,
      thumbImage: [
        "/assets/images/products/electronic/18.png",
        "/assets/images/products/electronic/19.png",
      ],
      images: [
        "/assets/images/products/electronic/18.png",
        "/assets/images/products/electronic/19.png",
        "/assets/images/products/electronic/20.png",
        "/assets/images/products/electronic/21png",
      ],
      description: "",
      slug: "sailing-smart-robot-vacuum-cleaner-powerful-52",
    },
    {
      id: "53",
      category: "electronic",
      subCategory: "tv",
      name: "Winterhalter Undercounter Dishwasher",
      rate: 4,
      price: 699,
      isNew: true,
      quantity: 8,
      thumbImage: [
        "/assets/images/products/electronic/19.png",
        "/assets/images/products/electronic/20.png",
      ],
      images: [
        "/assets/images/products/electronic/19.png",
        "/assets/images/products/electronic/20.png",
        "/assets/images/products/electronic/1.png",
        "/assets/images/products/electronic/2.png",
      ],
      description: "",
      slug: "winterhalter-undercounter-dishwasher-53",
    },
    {
      id: "54",
      category: "furniture",
      subCategory: "chair",
      name: "Afteroom Dining Chair",
      rate: 5,
      price: 389,
      quantity: 10,
      thumbImage: [
        "/assets/images/products/furniture/1.png",
        "/assets/images/products/furniture/2.png",
      ],
      images: [
        "/assets/images/products/furniture/1.png",
        "/assets/images/products/furniture/2.png",
        "/assets/images/products/furniture/3.png",
        "/assets/images/products/furniture/4.png",
      ],
      description: "",
      slug: "afteroom-dining-chair-54",
    },
    {
      id: "55",
      category: "furniture",
      subCategory: "chair",
      name: "Affordances Side Table",
      rate: 5,
      price: 299,
      discount: 10,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/furniture/2.png",
        "/assets/images/products/furniture/3.png",
      ],
      images: [
        "/assets/images/products/furniture/2.png",
        "/assets/images/products/furniture/3.png",
        "/assets/images/products/furniture/4.png",
        "/assets/images/products/furniture/5.png",
      ],
      description: "",
      slug: "affordances-side-table-55",
    },
    {
      id: "56",
      category: "furniture",
      subCategory: "chair",
      name: "Armchair 811",
      rate: 5,
      price: 276,
      quantity: 2,
      thumbImage: [
        "/assets/images/products/furniture/3.png",
        "/assets/images/products/furniture/4.png",
      ],
      images: [
        "/assets/images/products/furniture/3.png",
        "/assets/images/products/furniture/4.png",
        "/assets/images/products/furniture/5.png",
        "/assets/images/products/furniture/6.png",
      ],
      description: "",
      slug: "armchair-811-56",
    },
    {
      id: "57",
      category: "furniture",
      subCategory: "chair",
      name: "Bird Stool",
      rate: 4,
      price: 99,
      quantity: 40,
      thumbImage: [
        "/assets/images/products/furniture/4.png",
        "/assets/images/products/furniture/5.png",
      ],
      images: [
        "/assets/images/products/furniture/4.png",
        "/assets/images/products/furniture/5.png",
        "/assets/images/products/furniture/6.png",
        "/assets/images/products/furniture/7.png",
      ],
      description: "",
      slug: "bird-stool-57",
    },
    {
      id: "58",
      category: "furniture",
      subCategory: "table",
      name: "64 Bench",
      rate: 5,
      price: 457,
      quantity: 3,
      isNew: true,
      thumbImage: [
        "/assets/images/products/furniture/5.png",
        "/assets/images/products/furniture/6.png",
      ],
      images: [
        "/assets/images/products/furniture/5.png",
        "/assets/images/products/furniture/6.png",
        "/assets/images/products/furniture/7.png",
        "/assets/images/products/furniture/8.png",
      ],
      description: "",
      slug: "64-bench-58",
    },
    {
      id: "59",
      category: "furniture",
      subCategory: "table",
      name: "August Stool",
      rate: 3,
      price: 129,
      quantity: 13,
      thumbImage: [
        "/assets/images/products/furniture/6.png",
        "/assets/images/products/furniture/7.png",
      ],
      images: [
        "/assets/images/products/furniture/6.png",
        "/assets/images/products/furniture/7.png",
        "/assets/images/products/furniture/8.png",
        "/assets/images/products/furniture/9.png",
      ],
      description: "",
      slug: "august-stool-59",
    },
    {
      id: "60",
      category: "furniture",
      subCategory: "chair",
      name: "Aurea Coffee Table",
      rate: 4,
      price: 155,
      quantity: 14,
      thumbImage: [
        "/assets/images/products/furniture/7.png",
        "/assets/images/products/furniture/8.png",
      ],
      images: [
        "/assets/images/products/furniture/7.png",
        "/assets/images/products/furniture/8.png",
        "/assets/images/products/furniture/9.png",
        "/assets/images/products/furniture/10.png",
      ],
      description: "",
      slug: "aurea-coffee-table-60",
    },
    {
      id: "61",
      category: "furniture",
      subCategory: "chair",
      name: "BM62 Armchair",
      rate: 5,
      price: 369,
      quantity: 29,
      thumbImage: [
        "/assets/images/products/furniture/8.png",
        "/assets/images/products/furniture/9.png",
      ],
      images: [
        "/assets/images/products/furniture/8.png",
        "/assets/images/products/furniture/9.png",
        "/assets/images/products/furniture/10.png",
        "/assets/images/products/furniture/11.png",
      ],
      description: "",
      slug: "bm62-armchair-57",
    },
    {
      id: "62",
      category: "furniture",
      subCategory: "cabinet",
      name: "Carabottino Cabinet",
      rate: 5,
      price: 4209,
      quantity: 5,
      isNew: true,
      thumbImage: [
        "/assets/images/products/furniture/9.png",
        "/assets/images/products/furniture/10.png",
      ],
      images: [
        "/assets/images/products/furniture/9.png",
        "/assets/images/products/furniture/10.png",
        "/assets/images/products/furniture/11.png",
        "/assets/images/products/furniture/12.png",
      ],
      description: "",
      slug: "carabottino-cabinet-62",
    },
    {
      id: "63",
      category: "furniture",
      subCategory: "bed",
      name: "Covent Sofa Narrow, 3 Seater",
      rate: 5,
      price: 625,
      quantity: 8,
      thumbImage: [
        "/assets/images/products/furniture/10.png",
        "/assets/images/products/furniture/11.png",
      ],
      images: [
        "/assets/images/products/furniture/10.png",
        "/assets/images/products/furniture/11.png",
        "/assets/images/products/furniture/12.png",
        "/assets/images/products/furniture/13.png",
      ],
      description: "",
      slug: "covent-sofa-narrow-3-seater-63",
    },
    {
      id: "64",
      category: "furniture",
      subCategory: "bed",
      name: "Clerici Lounge Chair",
      rate: 5,
      price: 625,
      quantity: 8,
      thumbImage: [
        "/assets/images/products/furniture/11.png",
        "/assets/images/products/furniture/12.png",
      ],
      images: [
        "/assets/images/products/furniture/11.png",
        "/assets/images/products/furniture/12.png",
        "/assets/images/products/furniture/13.png",
        "/assets/images/products/furniture/14.png",
      ],
      description: "",
      slug: "clerici-lounge-chair-64",
    },
    {
      id: "65",
      category: "furniture",
      subCategory: "chair",
      name: "Coast Table Square",
      rate: 3,
      price: 459,
      discount: 15,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/furniture/12.png",
        "/assets/images/products/furniture/13.png",
      ],
      images: [
        "/assets/images/products/furniture/12.png",
        "/assets/images/products/furniture/13.png",
        "/assets/images/products/furniture/14.png",
        "/assets/images/products/furniture/15.png",
      ],
      description: "",
      slug: "coast-table-square-65",
    },
    {
      id: "66",
      category: "furniture",
      subCategory: "bed",
      name: "Cugino",
      rate: 5,
      price: 149,
      quantity: 26,
      thumbImage: [
        "/assets/images/products/furniture/13.png",
        "/assets/images/products/furniture/14.png",
      ],
      images: [
        "/assets/images/products/furniture/13.png",
        "/assets/images/products/furniture/14.png",
        "/assets/images/products/furniture/15.png",
        "/assets/images/products/furniture/16.png",
      ],
      description: "",
      slug: "cugino-66",
    },
    {
      id: "67",
      category: "furniture",
      subCategory: "bed",
      name: "DL1 Tangram Low Side Table",
      rate: 5,
      price: 479,
      quantity: 9,
      thumbImage: [
        "/assets/images/products/furniture/14.png",
        "/assets/images/products/furniture/15.png",
      ],
      images: [
        "/assets/images/products/furniture/16.png",
        "/assets/images/products/furniture/17.png",
        "/assets/images/products/furniture/18.png",
        "/assets/images/products/furniture/19.png",
      ],
      description: "",
      slug: "dl1-tangram-low-side-table-66",
    },
    {
      id: "68",
      category: "furniture",
      subCategory: "cabinet",
      name: "Champ Stool",
      rate: 5,
      price: 149,
      isNew: true,
      quantity: 26,
      thumbImage: [
        "/assets/images/products/furniture/15.png",
        "/assets/images/products/furniture/16.png",
      ],
      images: [
        "/assets/images/products/furniture/15.png",
        "/assets/images/products/furniture/16.png",
        "/assets/images/products/furniture/17.png",
        "/assets/images/products/furniture/18.png",
      ],
      description: "",
      slug: "champ-stool-68",
    },
    {
      id: "69",
      category: "furniture",
      subCategory: "cabinet",
      name: "Circle Mirror",
      rate: 4,
      price: 129,
      quantity: 26,
      thumbImage: [
        "/assets/images/products/furniture/16.png",
        "/assets/images/products/furniture/17.png",
      ],
      images: [
        "/assets/images/products/furniture/16.png",
        "/assets/images/products/furniture/17.png",
        "/assets/images/products/furniture/18.png",
        "/assets/images/products/furniture/19.png",
      ],
      description: "",
      slug: "circle-mirror-69",
    },
    {
      id: "70",
      category: "furniture",
      subCategory: "lamp",
      name: "Carrie",
      rate: 5,
      price: 49,
      quantity: 8,
      thumbImage: [
        "/assets/images/products/furniture/17.png",
        "/assets/images/products/furniture/18.png",
      ],
      images: [
        "/assets/images/products/furniture/17.png",
        "/assets/images/products/furniture/18.png",
        "/assets/images/products/furniture/19.png",
        "/assets/images/products/furniture/20.png",
      ],
      description: "",
      slug: "carrie-70",
    },
    {
      id: "71",
      category: "comestic",
      subCategory: "lipstick",
      name: "The expert mascaraa",
      rate: 4,
      price: 35,
      new: true,
      quantity: 0,
      variation: [
        {
          color: "red",
          colorCode: "#8B0000",
        },
        {
          color: "blue",
          colorCode: "#4169E1",
        },
      ],
      thumbImage: [
        "/assets/images/products/comestic/1.png",
        "/assets/images/products/comestic/2.png",
      ],
      images: [
        "/assets/images/products/comestic/1.png",
        "/assets/images/products/comestic/2.png",
        "/assets/images/products/comestic/3.png",
        "/assets/images/products/comestic/4.png",
      ],
      description: "",
      slug: "the-expert-mascaraa-71",
    },
    {
      id: "72",
      category: "comestic",
      subCategory: "lipstick",
      name: "Velvet Melon High Intensity",
      rate: 5,
      price: 38,
      quantity: 12,
      thumbImage: [
        "/assets/images/products/comestic/2.png",
        "/assets/images/products/comestic/3.png",
      ],
      images: [
        "/assets/images/products/comestic/2.png",
        "/assets/images/products/comestic/3.png",
        "/assets/images/products/comestic/4.png",
        "/assets/images/products/comestic/5.png",
      ],
      description: "",
      slug: "velvet-melon-high-intensity-72",
    },
    {
      id: "73",
      category: "comestic",
      subCategory: "lipstick",
      name: "Leather shopper bag",
      rate: 4,
      price: 35,
      discount: 5,
      quantity: 3,
      thumbImage: [
        "/assets/images/products/comestic/3.png",
        "/assets/images/products/comestic/4.png",
      ],
      images: [
        "/assets/images/products/comestic/3.png",
        "/assets/images/products/comestic/4.png",
        "/assets/images/products/comestic/5.png",
        "/assets/images/products/comestic/6.png",
      ],
      description: "",
      slug: "leather-shopper-bag-73",
    },
    {
      id: "74",
      category: "comestic",
      subCategory: "powder",
      name: "Luxe jewel lipstick",
      rate: 5,
      price: 38,
      quantity: 12,
      thumbImage: [
        "/assets/images/products/comestic/4.png",
        "/assets/images/products/comestic/5.png",
      ],
      images: [
        "/assets/images/products/comestic/4.png",
        "/assets/images/products/comestic/5.png",
        "/assets/images/products/comestic/6.png",
        "/assets/images/products/comestic/7.png",
      ],
      description: "",
      slug: "luxe-jewel-lipstick-74",
    },
    {
      id: "75",
      category: "comestic",
      subCategory: "powder",
      name: "Penpoint seamless beauty",
      rate: 5,
      price: 40,
      quantity: 12,
      isNew: true,
      thumbImage: [
        "/assets/images/products/comestic/5.png",
        "/assets/images/products/comestic/6.png",
      ],
      images: [
        "/assets/images/products/comestic/5.png",
        "/assets/images/products/comestic/6.png",
        "/assets/images/products/comestic/7.png",
        "/assets/images/products/comestic/8.png",
      ],
      description: "",
      slug: "penpoint-seamless-beauty-75",
    },
    {
      id: "76",
      category: "comestic",
      subCategory: "powder",
      name: "The Sneaky lips",
      rate: 5,
      price: 38,
      quantity: 12,
      thumbImage: [
        "/assets/images/products/comestic/7.png",
        "/assets/images/products/comestic/8.png",
      ],
      images: [
        "/assets/images/products/comestic/6.png",
        "/assets/images/products/comestic/7.png",
        "/assets/images/products/comestic/8.png",
        "/assets/images/products/comestic/9.png",
      ],
      description: "",
      slug: "the-sneaky-lips-76",
    },
    {
      id: "77",
      category: "comestic",
      subCategory: "perfume",
      name: "White Facial Cream",
      rate: 4,
      price: 38,
      quantity: 12,
      thumbImage: [
        "/assets/images/products/comestic/8.png",
        "/assets/images/products/comestic/9.png",
      ],
      images: [
        "/assets/images/products/comestic/8.png",
        "/assets/images/products/comestic/9.png",
        "/assets/images/products/comestic/10.png",
        "/assets/images/products/comestic/11.png",
      ],
      description: "",
      slug: "white-facial-cream-77",
    },
    {
      id: "78",
      category: "comestic",
      subCategory: "perfume",
      name: "Orange Massage Cream",
      rate: 4,
      price: 55,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/comestic/9.png",
        "/assets/images/products/comestic/10.png",
      ],
      images: [
        "/assets/images/products/comestic/9.png",
        "/assets/images/products/comestic/10.png",
        "/assets/images/products/comestic/11.png",
        "/assets/images/products/comestic/12.png",
      ],
      description: "",
      slug: "orange-massage-cream-78",
    },
    {
      id: "79",
      category: "comestic",
      subCategory: "perfume",
      name: "Valinta Fairness Massage Cream",
      rate: 4,
      price: 27,
      discount: 3,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/comestic/10.png",
        "/assets/images/products/comestic/11.png",
      ],
      images: [
        "/assets/images/products/comestic/10.png",
        "/assets/images/products/comestic/11.png",
        "/assets/images/products/comestic/12.png",
        "/assets/images/products/comestic/13.png",
      ],
      description: "",
      slug: "valinta-fairness-massage-cream-79",
    },
    {
      id: "80",
      category: "comestic",
      subCategory: "nail polish",
      name: "Massage Cream Cucumber",
      rate: 4,
      price: 16,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/comestic/11.png",
        "/assets/images/products/comestic/12.png",
      ],
      images: [
        "/assets/images/products/comestic/10.png",
        "/assets/images/products/comestic/11.png",
        "/assets/images/products/comestic/12.png",
        "/assets/images/products/comestic/13.png",
      ],
      description: "",
      slug: "massage-cream-cucumber-80",
    },
    {
      id: "81",
      category: "comestic",
      subCategory: "nail polish",
      name: "Matte Walnut & Bamboo Scrub",
      rate: 4,
      price: 32,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/comestic/12.png",
        "/assets/images/products/comestic/13.png",
      ],
      images: [
        "/assets/images/products/comestic/12.png",
        "/assets/images/products/comestic/13.png",
        "/assets/images/products/comestic/14.png",
        "/assets/images/products/comestic/15.png",
      ],
      description: "",
      slug: "matte-walnut-&-bamboo-scrub-81",
    },
    {
      id: "82",
      category: "comestic",
      subCategory: "mascara",
      name: "Castor Oil BP",
      rate: 4,
      price: 24,
      quantity: 6,
      thumbImage: [
        "/assets/images/products/comestic/13.png",
        "/assets/images/products/comestic/14.png",
      ],
      images: [
        "/assets/images/products/comestic/13.png",
        "/assets/images/products/comestic/14.png",
        "/assets/images/products/comestic/1.png",
        "/assets/images/products/comestic/2.png",
      ],
      description: "",
      slug: "castor-oil-bp-82",
    },
    {
      id: "83",
      category: "comestic",
      subCategory: "mascara",
      name: "Metallic Cap Cosmetic",
      rate: 5,
      price: 44,
      brand: "kenzo",
      code: "PM 03",
      point: 17,
      quantity: 1,
      thumbImage: [
        "/assets/images/products/comestic/14.png",
        "/assets/images/products/comestic/15.png",
      ],
      images: [
        "/assets/images/products/comestic/14.png",
        "/assets/images/products/comestic/15.png",
        "/assets/images/products/comestic/16.png",
        "/assets/images/products/comestic/17.png",
      ],
      description: "",
      slug: "metallic-cap-cosmetic-83",
    },
    {
      id: "84",
      category: "comestic",
      subCategory: "mascara",
      name: "Photo Match Concealer",
      rate: 5,
      price: 39,
      quantity: 1,
      thumbImage: [
        "/assets/images/products/comestic/15.png",
        "/assets/images/products/comestic/16.png",
      ],
      images: [
        "/assets/images/products/comestic/15.png",
        "/assets/images/products/comestic/16.png",
        "/assets/images/products/comestic/17.png",
        "/assets/images/products/comestic/18.png",
      ],
      description: "",
      slug: "photo-match-concealer-84",
    },
    {
      id: "85",
      category: "comestic",
      subCategory: "nail polish",
      name: "Matte Mousse Foundation",
      rate: 5,
      price: 46,
      quantity: 1,
      thumbImage: [
        "/assets/images/products/comestic/16.png",
        "/assets/images/products/comestic/17.png",
      ],
      images: [
        "/assets/images/products/comestic/16.png",
        "/assets/images/products/comestic/17.png",
        "/assets/images/products/comestic/18.png",
        "/assets/images/products/comestic/19.png",
      ],
      description: "",
      slug: "matte-mousse-foundation-85",
    },
    {
      id: "86",
      category: "comestic",
      subCategory: "perfume",
      name: "White Sandal Beauty",
      rate: 5,
      price: 67,
      quantity: 1,
      thumbImage: [
        "/assets/images/products/comestic/17.png",
        "/assets/images/products/comestic/18.png",
      ],
      images: [
        "/assets/images/products/comestic/17.png",
        "/assets/images/products/comestic/18.png",
        "/assets/images/products/comestic/19.png",
        "/assets/images/products/comestic/20.png",
      ],
      description: "",
      slug: "white-sandal-beauty-86",
    },
  ];
  */

  return (
    <LayoutOne title="Home">
      <h1>Home - {sampleRes}</h1>
      <div>
        {user ? (
          <p>
            Hello {user.data.user.display_name}!{" "}
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
        fourColumn
        shopSidebarResponsive={{ xs: 24, lg: 4 }}
        shopContentResponsive={{ xs: 24, lg: 20 }}
        productResponsive={{ xs: 12, sm: 8, md: 6 }}
        productPerPage={16}
        data={[...data]}
      />
    </LayoutOne>
  );
};

export const getServerSideProps = withSession((context) => {
  const { req } = context;

  return {
    props: {
      user: req.session.get("user") || null,
    },
  };
});

export default Home;
