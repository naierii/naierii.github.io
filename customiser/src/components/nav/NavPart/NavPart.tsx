import { CustomProductPartFragment, MaterialFragment } from '@graphql/generated/graphql';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { Suspense, useMemo } from 'react';
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
  const parts = useCustomiserStore((state) => state.parts);
  const currentPart = useMemo(() => parts.find((p) => p.part.id === part?.id), [part]);

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
            materialType={currentPart?.material.attributes?.type?.data}
            colourGroup={currentPart?.material.attributes?.colourGroups?.data[0]}
            onMaterialSelected={onMaterialSelected}
          />
        </Suspense>
      </motion.div>
      <NavButtons />
    </>
  );
};

export default NavPart;
