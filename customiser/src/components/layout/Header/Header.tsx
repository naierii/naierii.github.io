import Button from '@components/ui/Button';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';

import { useDesignStore } from '@store/design';
import styles from './Header.module.scss';

export interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const rootClassName = cn(styles.root, className);
  const total = useCustomiserStore((state) => state.total());
  const setResetCamera = useDesignStore((state) => state.setResetCamera);

  const saveDesign = () => {
    setResetCamera();
  };

  return (
    <div className={rootClassName}>
      <div className={styles.total}>
        Current <span className={styles.price}>${total}</span>
      </div>
      <Button onClick={saveDesign}>Add to basket</Button>
    </div>
  );
};

export default Header;
