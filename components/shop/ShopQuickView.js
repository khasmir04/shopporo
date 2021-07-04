import React, { useState } from "react";
import Slider from "react-slick";
import { Row, Col } from "antd";

import ProductDetailContentOne from "../productDetail/productDetailContent/ProductDetailContentOne";

function ShopQuickView({ data, setModalVisible }) {
  const slider1Settings = {
    arrows: false,
  };
  const slider2Settings = {
    arrows: false,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,

        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const onAddedToCart = () => {
    setModalVisible(false);
  };
  return (
    <div className="shop-qv">
      <Row align="middle" gutter={50}>
        <Col className="gutter-row" span={24} sm={24} md={10}>
          <div className="shop-qv__slide">
            <div className="shop-qv__slide-big">
              <Slider
                asNavFor={nav2}
                ref={(c) => setNav1(c)}
                {...slider1Settings}
              >
                {data &&
                  data.images.map((img, index) => (
                    <div key={index} className="slider-item">
                      <img src={img} alt="Product image" />
                    </div>
                  ))}
              </Slider>
            </div>
            <div className="shop-qv__slide-small">
              <Slider
                asNavFor={nav1}
                ref={(c) => setNav2(c)}
                {...slider2Settings}
              >
                {data &&
                  data.images.map((img, index) => (
                    <div key={index} className="slider-item">
                      <img src={img} alt="Product image" />
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={24} sm={24} md={14}>
          <ProductDetailContentOne
            data={data}
            hideGuaranteed
            onAddedToCart={onAddedToCart}
          />
        </Col>
      </Row>
    </div>
  );
}

export default React.memo(ShopQuickView);
