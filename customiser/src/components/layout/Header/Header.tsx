import Button from '@components/ui/Button';
import { EDIT_MODE } from '@store/constants';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { useCurrentGraphics } from '../../../context/CurrentGraphicsContext';

import styles from './Header.module.scss';

export interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const rootClassName = cn(styles.root, className);
  const total = useCustomiserStore((state) => state.total());
  const { graphic, setGraphic } = useCurrentGraphics();

  return (
    <div className={rootClassName}>
      <Button
        onClick={() =>
          setGraphic({
            freeze: !graphic?.freeze,
            editMode: !graphic?.freeze ? EDIT_MODE.EDIT_3D : EDIT_MODE.EDIT_2D,
          })
        }
      >
        Freeze
      </Button>
      <div className={styles.total}>
        Current <span className={styles.price}>${total}</span>
      </div>
      <Button disabled={true}>Add to basket</Button>
    </div>
  );
};

export default Header;
