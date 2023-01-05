import { CustomProductPartFragment, MaterialFragment } from '@graphql/generated/graphql';
import { useCustomiserStore } from '@store/customiser';
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
  const selectedPart = useCustomiserStore((state) => state.selectedPart);
  const setPart = useCustomiserStore((state) => state.setPart);

  if (!part?.materialGroup?.data) {
    return null;
  }

  const onMaterialSelected = (material: MaterialFragment) => {
    if (selectedPart && material) {
      setPart(selectedPart, material);
    }
  };

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
          <MaterialGroup
            materialGroup={part.materialGroup.data}
            part={part}
            onMaterialSelected={onMaterialSelected}
          />
        </Suspense>
      </motion.div>
      <NavButtons />
    </>
  );
};

export default NavPart;
