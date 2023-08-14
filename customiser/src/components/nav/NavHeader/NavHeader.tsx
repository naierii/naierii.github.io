import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';

import styles from './NavHeader.module.scss';

export interface NavHeaderProps {
  className?: string;
  toggle: () => void;
  isOpen: boolean;
}

const NavHeader = ({ className, toggle, isOpen }: NavHeaderProps) => {
  const rootClassName = cn(styles.root, className);
  const selectedNav = useCustomiserStore((state) => state.selectedNav);

  if (isOpen) {
    return null;
  }

  return (
    <div className={rootClassName}>
      <div className={styles.nav}>
        <div className={styles.title}>{selectedNav?.name}</div>
      </div>
    </div>
  );
};

export default NavHeader;
