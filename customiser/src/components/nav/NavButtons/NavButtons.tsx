import Button from '@components/ui/Button';
import cn from 'classnames';

import styles from './NavButtons.module.scss';

export interface NavButtonsProps {
  className?: string;
}

const NavButtons = ({ className }: NavButtonsProps) => {
  const rootClassName = cn(styles.root, className);
  return (
    <div className={rootClassName}>
      <Button>Cancel</Button>
      <Button colour='red'>Save & Next</Button>
    </div>
  );
};

export default NavButtons;
