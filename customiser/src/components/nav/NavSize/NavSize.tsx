import OptionButton from '@components/ui/OptionButton';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';

import styles from './NavSize.module.scss';

export interface NavSizeProps {
  className?: string;
}

const NavSize = ({ className }: NavSizeProps) => {
  const rootClassName = cn(styles.root, className);
  const variations = useCustomiserStore((state) => state.variations);

  return (
    <div className={rootClassName}>
      <h3>Size Details</h3>
      <p>
        To help us make sure the size you’ve selected is correct, enter your height and weight
        below.
      </p>
      <input type='number' placeholder='Enter Height' step='0.01' required />
      <input type='number' placeholder='Enter Weight' step='0.01' required />
      <h3>Suggested Size</h3>
      <div className={styles.variations}>
        {variations.map((v) => (
          <OptionButton key={v.id}>{v.title}</OptionButton>
        ))}
      </div>
    </div>
  );
};

export default NavSize;
