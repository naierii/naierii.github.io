import Button from '@components/ui/Button';
import { usePortalRef } from '@hooks';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import ReactDOM from 'react-dom';

import styles from './NavButtons.module.scss';

export interface NavButtonsProps {
  className?: string;
}

const NavButtons = ({ className }: NavButtonsProps) => {
  const rootClassName = cn(styles.root, className);
  const cancelPartChange = useCustomiserStore((state) => state.cancelPartChange);
  const resetNav = useCustomiserStore((state) => state.resetNav);
  const portalRef = usePortalRef('CustomiserNavActions');

  if (!portalRef) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={rootClassName}>
      <Button onClick={() => cancelPartChange()}>Cancel</Button>
      <Button colour='red' onClick={() => resetNav()}>
        Save
      </Button>
    </div>,
    portalRef,
  );
};

export default NavButtons;
