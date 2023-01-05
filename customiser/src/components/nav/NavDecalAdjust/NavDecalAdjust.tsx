import cn from 'classnames';
import RangeSlider from 'react-range-slider-input';

import 'react-range-slider-input/dist/style.css';
import styles from './NavDecalAdjust.module.scss';

export interface NavDecalAdjustProps {
  className?: string;
  scale?: number;
  rotation?: number;
  onScale?: (event: [number, number]) => void;
  onRotate?: (event: [number, number]) => void;
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
      <h4>Scale</h4>
      <RangeSlider
        className={styles.scale}
        value={[0, scale]}
        step={0.1}
        min={0}
        max={2}
        thumbsDisabled={[true, false]}
        onInput={onScale}
      />
      <h4>Rotate</h4>
      <RangeSlider
        className={styles.rotate}
        value={[0, rotation]}
        step={5}
        min={0}
        max={360}
        thumbsDisabled={[true, false]}
        onInput={onRotate}
      />
    </div>
  );
};

export default NavDecalAdjust;
