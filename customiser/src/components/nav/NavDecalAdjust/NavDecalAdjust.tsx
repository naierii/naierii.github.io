/* eslint-disable react/prop-types */
import Price from '@components/ui/Price';
import { GraphicPriceFragment } from '@graphql/generated/graphql';
import cn from 'classnames';
import ReactSlider from 'react-slider';
import styles from './NavDecalAdjust.module.scss';
export interface NavDecalAdjustProps {
  className?: string;
  prices?: GraphicPriceFragment[];
  scale?: number;
  rotation?: number;
  onScale?: (event: number) => void;
  onRotate?: (event: number) => void;
}

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

const NavDecalAdjust = ({
  className,
  scale = 1,
  rotation = 0,
  prices,
  onScale,
  onRotate,
}: NavDecalAdjustProps) => {
  const rootClassName = cn(styles.root, className);
  const min = 1;
  const max = 2;
  const numberOfSteps = prices?.length ?? 4;
  const step = (max - min) / (numberOfSteps - 1);
  const marks = range(min, max, step);

  const formattedPrices = prices?.map((p, i) => ({
    ...p,
    markKey: marks[i],
  }));

  return (
    <div className={rootClassName}>
      <h4>Scale</h4>
      <ReactSlider
        className={styles.scale}
        thumbClassName={styles.thumb}
        trackClassName={styles.track}
        markClassName={styles.mark}
        marks={marks}
        step={step}
        min={min}
        max={max}
        defaultValue={min}
        value={scale}
        onChange={onScale}
        renderMark={(props) => {
          if (props.key && props.key < scale) {
            props.className = 'mark mark-before';
          } else if (props.key && props.key === scale) {
            props.className = 'mark mark-active';
          }
          const price = formattedPrices?.find((p) => p.markKey === props?.key);
          return <span {...props} />;
        }}
      />
      <h4>Rotate</h4>
      <ReactSlider
        className={styles.rotate}
        thumbClassName={styles.thumb}
        trackClassName={styles.track}
        markClassName={styles.mark}
        min={0}
        max={360}
        defaultValue={0}
        value={rotation}
        onChange={onRotate}
        renderMark={(props) => {
          // eslint-disable-next-line react/prop-types
          if (props.key && props.key < scale) {
            props.className = 'mark mark-before';
            // eslint-disable-next-line react/prop-types
          } else if (props.key && props.key === scale) {
            props.className = 'mark mark-active';
          }
          return <span {...props} />;
        }}
      />
    </div>
  );
};

export default NavDecalAdjust;
