import Button from '@components/ui/Button';
import cn from 'classnames';

import styles from './Header.module.scss';

export interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const rootClassName = cn(styles.root, className);
  return (
    <div className={rootClassName}>
      <Button disabled={true}>Add to basket</Button>
    </div>
  );
};

export default Header;
