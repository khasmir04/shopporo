import { Rate, Button, Radio, Progress, message } from "antd";
import QuantitySelector from "../../controls/QuantitySelector";
import { useState } from "react";
import classNames from "classnames";

const ProductDetailContentOne = ({ data, onAddedToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentColor, setCurrentColor] = useState("none");
  const [currentSize, setCurrentSize] = useState("none");

  const onAddProductToCart = (data) => {
    // if (avaiableQuantity === 0) {
    //   return;
    // }
    // dispatch(addToCart(data, quantity, currentColor, currentSize));

    onAddedToCart && onAddedToCart();
    message.success("Product added to cart successfully");
  };

  const onChooseSize = (e) => {
    setCurrentSize(e.target.value);
  };

  const onChooseColor = (e) => {
    setCurrentColor(e.target.value);
  };

  return (
    <div className="product-detail-content-one">
      <h3>{data.name}</h3>
      <div className="product-detail-content-one-rate">
        <Rate disabled defaultValue={data.rate} />
        <span className="product-detail-content-one-review-count">
          - 5 Reviews
        </span>
      </div>
      <div className="product-detail-content-one-price">
        <h5>${data.discount ? data.price - data.discount : data.price}</h5>
        {data.discount && <span>${data.price}</span>}
      </div>
      <p className="product-detail-content-one-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi illo
        possimus quae tenetur. Porro aliquam quaerat dolorum pariatur molestias
        commodi ipsa
      </p>
      {/* {showCountdown && (
        <>
          <div className="product-detail-content-one-countdown">
            <h3>Hurry Up ! Sales end in :</h3>
            <div className="product-detail-content-one-countdown__items">
              <Countdown
                date={Date.now() + 100000000}
                renderer={({ days, hours, minutes, seconds, completed }) => (
                  <>
                    <div className="product-detail-content-one-countdown__item">
                      <div>{zeroPad(days)}</div>
                      <span>days</span>
                    </div>
                    :
                    <div className="product-detail-content-one-countdown__item">
                      <div>{zeroPad(hours)}</div>
                      <span>hours</span>
                    </div>
                    :
                    <div className="product-detail-content-one-countdown__item">
                      <div>{zeroPad(minutes)}</div>
                      <span>mins</span>
                    </div>
                    :
                    <div className="product-detail-content-one-countdown__item">
                      <div>{zeroPad(seconds)}</div>
                      <span>secs</span>
                    </div>
                  </>
                )}
              />
            </div>
            <div className="product-detail-content-one-countdown__sold">
              <Progress percent={50} showInfo={false} />
              <div className="sold-data">
                <h5>
                  Already Sold:
                  <span>20</span>
                </h5>
                <h5>
                  Total:
                  <span>20</span>
                </h5>
              </div>
            </div>
          </div>
        </>
      )} */}
      <div className="product-detail-content-one-variation">
        {data.size && (
          <div className="variation-item -size">
            <>
              <p>Size:</p>
              <Radio.Group onChange={onChooseSize} defaultValue="a">
                {data.size.map((item, index) => (
                  <Radio.Button key={index} value={item.name}>
                    {item.name}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </>
          </div>
        )}

        {data.variation && (
          <div className="variation-item -color">
            <>
              <p>Color:</p>
              <Radio.Group onChange={onChooseColor} defaultValue="a">
                {data.variation.map((item, index) => (
                  <Radio.Button
                    key={index}
                    value={item.color}
                    style={{ backgroundColor: item.colorCode }}
                  ></Radio.Button>
                ))}
              </Radio.Group>
            </>
          </div>
        )}
      </div>
      <div className="product-detail-content-one-actions">
        <QuantitySelector
          // noRound={quantityControllerNoRound}
          defaultValue={1}
          onChange={(val) => setQuantity(val)}
          size="big"
          // max={checkAvaiableQuantityToAdd(cartState, data)}
          max={Math.ceil(Math.random() * 100)}
        />
        <Button
          onClick={() => onAddProductToCart(data)}
          // disabled={avaiableQuantity === 0}
          disabled={false}
          className={`product-detail-content-one-atc ${classNames({
            // disabled: avaiableQuantity === 0,
            disabled: false,
          })}`}
          type="link"
          danger
        >
          Add to cart
        </Button>
      </div>
      {/* {!hideGuaranteed && <ProductGuaranteed />} */}
    </div>
  );
};

export default ProductDetailContentOne;
