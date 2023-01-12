import cn from 'classnames';

import styles from './Price.module.scss';

export interface PriceProps {
  className?: string;
  price?: number;
}

const Price = ({ className, price }: PriceProps) => {
  const rootClassName = cn(styles.root, className);
  // TODO - Make currency change depending on selected currency.
  const currency = '$';

  if (!price) {
    return null;
  }

  const formattedPrice = price.toFixed(2);

  return (
    <span className={rootClassName}>
      {currency}
      {formattedPrice}
    </span>
  );
};

export default Price;
