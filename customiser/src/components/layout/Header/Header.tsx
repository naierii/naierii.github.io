import Button from '@components/ui/Button';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';

import styles from './Header.module.scss';

export interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const rootClassName = cn(styles.root, className);
  const total = useCustomiserStore((state) => state.total());

  return (
    <div className={rootClassName}>
      <div className={styles.total}>
        Current <span className={styles.price}>${total}</span>
      </div>
      <Button disabled={true}>Add to basket</Button>
    </div>
  );
};

export default Header;
