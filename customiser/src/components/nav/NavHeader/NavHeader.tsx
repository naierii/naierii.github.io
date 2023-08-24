import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';

import styles from './NavHeader.module.scss';

export interface NavHeaderProps {
  className?: string;
  toggle: () => void;
  isOpen: boolean;
  isMinimized?: boolean;
  onClick?: () => void;
}

const NavHeader = ({ className, toggle, isOpen, isMinimized = false, onClick }: NavHeaderProps) => {
  const rootClassName = cn(styles.root, className);
  const selectedNav = useCustomiserStore((state) => state.selectedNav);

  if (isOpen) {
    return null;
  }

  const minimizeIconClassname = cn(styles.minimizeIcon, {
    [styles.minimized]: isMinimized,
  });

  return (
    <div className={rootClassName} onClick={onClick}>
      <div className={styles.nav}>
        <div className={styles.title}>{selectedNav?.name}</div>
        <div className={minimizeIconClassname}>
          <svg viewBox='0 0 330 330'>
            <path
              xmlns='http://www.w3.org/2000/svg'
              id='XMLID_224_'
              d='M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394  l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393  C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z'
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NavHeader;
