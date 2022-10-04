import cn from 'classnames';
import { Html, useProgress } from '@react-three/drei';

import styles from './Loader.module.scss';

export interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  const { progress } = useProgress();
  const rootClassName = cn(styles.root, className);

  return (
    <Html center>
      <div className={rootClassName}>{progress.toFixed(2)} % loaded</div>
    </Html>
  );
};

export default Loader;
