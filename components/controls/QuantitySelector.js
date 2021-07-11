import { Button } from "antd";
import classNames from "classnames";

const QuantitySelector = ({
  min,
  max,
  defaultValue,
  onChange,
  size,
  noRound,
  className,
  onDecrease,
  onIncrease,
  data,
}) => {
  return (
    <div className={`quantity-selector`}>
      <Button
        disabled={data.qty <= min}
        className="quantity-selector-controller"
        type="link"
        onClick={onDecrease}
      >
        -
      </Button>
      <div className="quantity-selector-number">{data.qty}</div>
      <Button
        disabled={data.qty >= max}
        className="quantity-selector-controller"
        type="link"
        onClick={onIncrease}
      >
        +
      </Button>
    </div>
  );
};

export default QuantitySelector;
