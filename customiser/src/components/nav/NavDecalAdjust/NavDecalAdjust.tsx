import FormInput from '@components/ui/FormInput';
import cn from 'classnames';
import { ChangeEvent } from 'react';

import styles from './NavDecalAdjust.module.scss';

export interface NavDecalAdjustProps {
  className?: string;
  scale?: number;
  rotation?: number;
  onScale?: (event: ChangeEvent<HTMLInputElement>) => void;
  onRotate?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const NavDecalAdjust = ({
  className,
  scale = 1,
  rotation = 0,
  onScale,
  onRotate,
}: NavDecalAdjustProps) => {
  const rootClassName = cn(styles.root, className);
  return (
    <div className={rootClassName}>
      <FormInput type='number' placeholder='Scale' value={scale} onChange={onScale} />
      <FormInput type='number' placeholder='Rotate' value={rotation} onChange={onRotate} />
    </div>
  );
};

export default NavDecalAdjust;
