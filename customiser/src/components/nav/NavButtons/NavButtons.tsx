import Button from '@components/ui/Button';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';

import styles from './NavButtons.module.scss';

export interface NavButtonsProps {
  className?: string;
}

const NavButtons = ({ className }: NavButtonsProps) => {
  const rootClassName = cn(styles.root, className);
  const selectedNav = useCustomiserStore((state) => state.selectedNav);
  const setSelectedNav = useCustomiserStore((state) => state.setSelectedNav);
  const cancelPartChange = useCustomiserStore((state) => state.cancelPartChange);

  if (!selectedNav) {
    return null;
  }

  const currentIndex = selectedNav.index;
  const next = currentIndex || currentIndex === 0 ? currentIndex + 1 : 0;

  return (
    <div className={rootClassName}>
      <Button onClick={() => cancelPartChange()}>Cancel</Button>
      <Button colour='red' onClick={() => setSelectedNav(next, true)}>
        Save & Next
      </Button>
    </div>
  );
};

export default NavButtons;
