import cn from 'classnames';

import styles from './Price.module.scss';

export interface PriceProps {
  className?: string;
  price?: number;
  priceString?: string;
}

const Price = ({ className, price, priceString }: PriceProps) => {
  const rootClassName = cn('price-item', styles.root, className);
  // TODO - Make currency change depending on selected currency.
  const currency = '£';

  const formattedPrice =
    price !== undefined ? `${currency}${price.toFixed(2)}` : `${currency}${priceString}`;

  if (!formattedPrice) {
    return null;
  }

  return <span className={rootClassName}>{formattedPrice}</span>;
};

export default Price;
