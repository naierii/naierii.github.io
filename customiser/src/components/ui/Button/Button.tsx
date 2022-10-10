import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  colour?: 'black' | 'red';
}

const Button = ({ className, colour, children, ...rest }: ButtonProps) => {
  const rootClassName = cn(styles.root, { [styles.red]: colour === 'red' }, className);
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
