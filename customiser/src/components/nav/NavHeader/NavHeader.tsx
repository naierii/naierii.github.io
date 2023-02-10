import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import NavBurger from '../NavBurger';

import styles from './NavHeader.module.scss';

export interface NavHeaderProps {
  className?: string;
  toggle: () => void;
  isOpen: boolean;
}

const NavHeader = ({ className, toggle, isOpen }: NavHeaderProps) => {
  const rootClassName = cn(styles.root, className);
  const navItemsLength = useCustomiserStore((state) => state.navItems.length);
  const selectedNav = useCustomiserStore((state) => state.selectedNav);
  const setSelectedNav = useCustomiserStore((state) => state.setSelectedNav);

  if (!selectedNav) {
    return null;
  }

  const currentIndex = selectedNav.index;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex || currentIndex === 0 ? currentIndex + 1 === navItemsLength : false;
  const prev = currentIndex || currentIndex === 0 ? currentIndex - 1 : 0;
  const next = currentIndex || currentIndex === 0 ? currentIndex + 1 : 0;

  return (
    <div className={rootClassName}>
      <div className={styles.menu}>
        <NavBurger onClick={toggle} isOpen={isOpen} />
      </div>
      {isOpen ? (
        <div className={styles.nav}>
          <div className={styles.title}>All Options</div>
        </div>
      ) : (
        <div className={styles.nav}>
          {navItemsLength && (
            <button
              className={cn(styles.navIcon, styles.navIconPrev)}
              disabled={isFirst ?? null}
              onClick={() => setSelectedNav(prev)}
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14.6 23.219'>
                <path d='m0 11.609 1.489-1.489L11.609 0 14.6 2.978l-8.631 8.631 8.631 8.632-2.991 2.978L1.489 13.1Z' />
              </svg>
            </button>
          )}
          <div className={styles.title}>
            {currentIndex?.toString() ? `${currentIndex + 1}:` : null} {selectedNav?.name}
          </div>
          {navItemsLength && (
            <button
              className={cn(styles.navIcon, styles.navIconNext)}
              disabled={isLast ?? null}
              onClick={() => setSelectedNav(next)}
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14.601 23.219'>
                <path d='m14.601 11.609-1.489-1.489L2.992 0 .001 2.978l8.631 8.631-8.631 8.632 2.991 2.978L13.112 13.1Z' />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NavHeader;
