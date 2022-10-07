import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import { m } from 'framer-motion';
import styles from './NavBurger.module.scss';

export interface NavBurgerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const NavBurger = ({ className, ...rest }: NavBurgerProps) => {
  const rootClassName = cn(styles.root, className);
  return (
    <button className={rootClassName} {...rest}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
        <m.path
          variants={{
            closed: { d: 'M32 7H0V3h32Z' },
            open: { d: 'M28.456 5.829 5.828 28.456 3 25.628 25.627 3Z' },
          }}
        />
        <m.path
          d='M32 18H0v-4h32Z'
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <m.path
          variants={{
            closed: { d: 'M32 29H0v-4h32Z' },
            open: { d: 'M25.627 28.456 3 5.828 5.828 3l22.628 22.627Z' },
          }}
        />
      </svg>
    </button>
  );
};

export default NavBurger;
