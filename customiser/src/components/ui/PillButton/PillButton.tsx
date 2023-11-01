import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import styles from './PillButton.module.scss';

export interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  selected?: boolean;
  color?: 'red' | 'black' | 'darkGrey';
}

const PillButton = ({
  className,
  children,
  selected = false,
  color = 'red',
  ...rest
}: PillButtonProps) => {
  const rootClassName = cn(
    styles.pillButton,
    { [styles.pillButtonSelected]: selected, [styles[color]]: color },
    className,
  );
  return (
    <button className={rootClassName} {...rest}>
      {children}
    </button>
  );
};

export default PillButton;
