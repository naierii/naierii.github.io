import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { AnimatePresence, motion, useCycle } from 'framer-motion';
import { Suspense } from 'react';
import NavFitting from '../NavFitting';
import NavFlags from '../NavFlags';
import NavHeader from '../NavHeader';
import NavImages from '../NavImages';
import NavOptions from '../NavOptions';
import NavPart from '../NavPart';
import NavSize from '../NavSize';
import NavText from '../NavText';

import styles from './CustomiserNav.module.scss';

export interface CustomiserNavProps {
  className?: string;
}

const CustomiserNav = ({ className }: CustomiserNavProps) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const selectedPart = useCustomiserStore((state) => state.selectedPart);
  const selectedNav = useCustomiserStore((state) => state.selectedNav);

  const rootClassName = cn(
    styles.root,
    { [styles.open]: isOpen, [styles.hasActions]: selectedNav?.hasActions },
    className,
  );

  return (
    <motion.nav className={rootClassName} initial={'closed'} animate={isOpen ? 'open' : 'closed'}>
      <NavHeader className={styles.header} toggle={() => toggleOpen()} isOpen={isOpen} />
      <Suspense fallback={<div>Loading...</div>}>
        <AnimatePresence initial={false}>
          <div id='scrollable' className={styles.content}>
            {isOpen ? (
              <NavOptions toggle={() => toggleOpen()} />
            ) : selectedNav?.type === 'fitting' ? (
              <NavFitting />
            ) : selectedNav?.type === 'names' ? (
              <NavText />
            ) : selectedNav?.type === 'flags' ? (
              <NavFlags />
            ) : selectedNav?.type === 'images' ? (
              <NavImages />
            ) : selectedNav?.type === 'size' ? (
              <NavSize />
            ) : selectedPart ? (
              <NavPart part={selectedPart} />
            ) : null}
          </div>
        </AnimatePresence>
      </Suspense>
      {!isOpen && selectedNav?.hasActions && (
        <div id='CustomiserNavActions' className={styles.actions}></div>
      )}
    </motion.nav>
  );
};

export default CustomiserNav;
