import { Button } from 'antd'
import classNames from 'classnames'

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
}) => {
  return (
    <div className={`quantity-selector`}>
      <Button className="quantity-selector-controller" type="link">
        -
      </Button>
      <div className="quantity-selector-number">1</div>
      <Button className="quantity-selector-controller" type="link">
        +
      </Button>
    </div>
  )
}

export default QuantitySelector
