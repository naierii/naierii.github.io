import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';

import styles from './NavBack.module.scss';

export interface NavBackProps {
  className?: string;
}

const NavBack = ({ className }: NavBackProps) => {
  const rootClassName = cn(styles.root, className);
  const resetNav = useCustomiserStore((state) => state.resetNav);
  return (
    <button className={rootClassName} onClick={resetNav}>
      Back
    </button>
  );
};

export default NavBack;
