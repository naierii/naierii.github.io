import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { m, useCycle } from 'framer-motion';
import NavButtons from '../NavButtons';
import NavFitting from '../NavFitting';
import NavHeader from '../NavHeader';
import NavPart from '../NavPart';
import NavSize from '../NavSize';

import styles from './CustomiserNav.module.scss';

export interface CustomiserNavProps {
  className?: string;
}

const CustomiserNav = ({ className }: CustomiserNavProps) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const rootClassName = cn(styles.root, className);
  const selectedPart = useCustomiserStore((state) => state.selectedPart);
  const selectedNav = useCustomiserStore((state) => state.selectedNav);

  return (
    <m.nav className={rootClassName} initial={'closed'} animate={isOpen ? 'open' : 'closed'}>
      <NavHeader className={styles.header} toggle={() => toggleOpen()} />
      <div className={styles.content}>
        {selectedNav?.type === 'fitting' ? (
          <NavFitting />
        ) : selectedNav?.type === 'size' ? (
          <NavSize />
        ) : selectedPart ? (
          <NavPart part={selectedPart} />
        ) : null}
      </div>
      <NavButtons className={styles.actions} />
    </m.nav>
  );
};

export default CustomiserNav;
