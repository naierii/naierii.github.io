import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  colour?: 'black' | 'red' | 'darkGrey' | 'yellow';
}

const Button = ({ className, colour = 'black', children, ...rest }: ButtonProps) => {
  const rootClassName = cn(styles.root, { [styles[colour]]: colour }, className);
  return (
    <button className={rootClassName} {...rest}>
      <span>{children}</span>
    </button>
  );
};

Button.defaultProps = {
  colour: 'black',
};

export default Button;
