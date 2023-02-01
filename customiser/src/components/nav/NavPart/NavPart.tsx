import PillButton from '@components/ui/PillButton';
import { CustomProductPartFragment, MaterialFragment } from '@graphql/generated/graphql';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { Suspense, useEffect, useMemo, useState } from 'react';
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
  const removePart = useCustomiserStore((state) => state.removePart);
  const parts = useCustomiserStore((state) => state.parts);
  const currentPart = useMemo(() => parts.find((p) => p.part.id === part?.id), [part]);
  const [showOptional, setShowOptional] = useState(false);

  if (!part?.materialGroup?.data) {
    return null;
  }

  const onMaterialSelected = (material: MaterialFragment) => {
    if (selectedPart && material) {
      setPart(selectedPart, material);
    }
  };

  const optionalOnClick = (show: boolean) => {
    setShowOptional(show);
    if (!show) {
      removePart(part);
    }
  };

  useEffect(() => {
    if (part.optional && !showOptional && currentPart) {
      setShowOptional(true);
    }
  }, []);

  return (
    <>
      <motion.div
        key={part.id}
        className={rootClassName}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {part.optional && (
          <PillButton
            className={styles.showOptional}
            selected={showOptional}
            onClick={() => optionalOnClick(!showOptional)}
          >
            {showOptional ? 'Remove' : 'Add'} {part.name}
          </PillButton>
        )}
        {(!part.optional || (part.optional && showOptional)) && (
          <Suspense fallback={<div>Loading...</div>}>
            <MaterialGroup
              materialGroup={part.materialGroup.data}
              materialType={currentPart?.material.attributes?.type?.data}
              colourGroup={currentPart?.material.attributes?.colourGroups?.data[0]}
              onMaterialSelected={onMaterialSelected}
            />
          </Suspense>
        )}
      </motion.div>
      <NavButtons />
    </>
  );
};

export default NavPart;
