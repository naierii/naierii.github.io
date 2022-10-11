import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import styles from './OptionButton.module.scss';

export interface OptionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  selected?: boolean;
}

const OptionButton = ({ className, selected, children, ...rest }: OptionButtonProps) => {
  const rootClassName = cn(
    styles.root,
    {
      [styles.selected]: selected,
    },
    className,
  );
  return (
    <button className={rootClassName} {...rest}>
      {children}
    </button>
  );
};

export default OptionButton;
