import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({ className, children, ...rest }: ButtonProps) => {
  const rootClassName = cn(styles.root, className);
  return <button className={rootClassName} {...rest}><span>{children}</span></button>;
};

export default Button;
