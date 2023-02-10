import Button from '@components/ui/Button';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';

import { useDesignStore } from '@store/design';
import styles from './Header.module.scss';
import Price from '@components/ui/Price';

export interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const rootClassName = cn(styles.root, className);
  const total = useCustomiserStore((state) => state.total());
  const designComplete = useCustomiserStore((state) => state.designComplete());
  const setResetCamera = useDesignStore((state) => state.setResetCamera);
  const addingToCart = useDesignStore((state) => state.addingToCart);

  const saveDesign = () => {
    setResetCamera();
  };

  return (
    <div className={rootClassName}>
      <div className={styles.total}>
        Current <Price className={styles.price} priceString={total} />
      </div>
      <Button onClick={saveDesign} disabled={!designComplete || addingToCart}>
        {addingToCart ? 'Saving' : 'Add to basket'}
      </Button>
    </div>
  );
};

export default Header;
