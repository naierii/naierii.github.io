import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import styles from './NavBurger.module.scss';

export interface NavBurgerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isOpen: boolean;
}

const NavBurger = ({ className, isOpen, ...rest }: NavBurgerProps) => {
  const rootClassName = cn(
    'hamburger',
    'hamburger--emphatic',
    { 'is-active': isOpen, [styles['is-active']]: isOpen },
    styles.hamburger,
    className,
  );
  return (
    <button className={rootClassName} {...rest}>
      <span className='hamburger-box'>
        <span className={cn('hamburger-inner', styles['hamburger-inner'])}></span>
      </span>
    </button>
  );
};

export default NavBurger;
