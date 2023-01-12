import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import styles from './PillButton.module.scss';

export interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  selected?: boolean;
}

const PillButton = ({ className, children, selected = false, ...rest }: PillButtonProps) => {
  const rootClassName = cn(styles.pillButton, { [styles.pillButtonSelected]: selected }, className);
  return (
    <button className={rootClassName} {...rest}>
      {children}
    </button>
  );
};

export default PillButton;
