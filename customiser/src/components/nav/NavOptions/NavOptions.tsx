import { NavItem, useCustomiserStore } from '@store/customiser';
import cn from 'classnames';

import styles from './NavOptions.module.scss';

export interface NavOptionsProps {
  toggle: () => void;
}

const NavOptions = ({ toggle }: NavOptionsProps) => {
  const navItems = useCustomiserStore((state) => state.navItems);
  const sizingVariation = useCustomiserStore((state) => state.sizing?.variation);
  const parts = useCustomiserStore((state) => state.savedParts);
  const setSelectedNav = useCustomiserStore((state) => state.setSelectedNav);

  const handleClick = (index: number) => {
    toggle();
    setSelectedNav(index);
  };

  const isSelected = (item: NavItem) => {
    if (item.type === 'fitting') return true;
    if (item.type === 'size' && sizingVariation) return true;
    if (item.type === 'part' && parts.find((p) => p.part.id === item.id)) return true;
  };

  return (
    <>
      {navItems.map((item) => (
        <button
          className={styles.option}
          key={item.index}
          onClick={() => handleClick(item.index ? item.index : 0)}
        >
          <div className={styles.optionTitle}>
            <h3>
              {item?.index?.toString() ? `${item.index + 1}:` : null} {item.name}
            </h3>
            {item.required && 'Required'}
          </div>
          <svg
            className={cn(styles.icon, { [styles.iconSelected]: isSelected(item) })}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 26.223 20.854'
          >
            <path d='m.854 11.955 2.604-3.11L9.952 14.3 21.736.248l3.102 2.614-14.39 17.22Z' />
          </svg>
        </button>
      ))}
    </>
  );
};

export default NavOptions;
