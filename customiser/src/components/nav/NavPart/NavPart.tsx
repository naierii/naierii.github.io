import { CustomProductPartFragment } from '@graphql/generated/graphql';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import MaterialGroup from '../MaterialGroup';
import NavButtons from '../NavButtons';

import styles from './NavPart.module.scss';

export interface NavPartProps {
  className?: string;
  part: CustomProductPartFragment;
}

const NavPart = ({ className, part }: NavPartProps) => {
  const rootClassName = cn(styles.root, className);

  if (!part?.materialGroup?.data) {
    return null;
  }

  return (
    <>
      <motion.div
        key={part.id}
        className={rootClassName}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <MaterialGroup materialGroup={part.materialGroup.data} part={part} />
        </Suspense>
      </motion.div>
      <NavButtons />
    </>
  );
};

export default NavPart;
