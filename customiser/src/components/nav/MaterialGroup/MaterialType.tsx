import Button from '@components/ui/Button';
import {
  useGetMaterialsQuery,
  MaterialEntity,
  MaterialColourGroupEntity,
  Maybe,
  MaterialTypeEntity,
} from '@graphql/generated/graphql';
import graphQLClient from '@graphql/graphql-client';
import cn from 'classnames';
import { useEffect, useMemo } from 'react';
import { Material } from './Material';
import styles from './MaterialGroup.module.scss';
import { useMaterialGroupStore } from './MaterialGroupState';

export interface MaterialTypeProps {
  className?: string;
}

export const MaterialType = ({ className }: MaterialTypeProps) => {
  const rootClassName = cn(styles.materialType, className);
  const filteredMaterials = useMaterialGroupStore((state) => state.filteredMaterials());
  const materialTypes = useMaterialGroupStore((state) => state.materialTypes);
  const selectedMaterialType = useMaterialGroupStore((state) => state.selectedMaterialType);
  const setMaterialType = useMaterialGroupStore((state) => state.setMaterialType);
  return (
    <div className={rootClassName}>
      <h3>Texture</h3>
      <div className={styles.materialTypes}>
        {materialTypes.map((mt) => (
          <Button
            className={cn(styles.pillButton, {
              [styles.pillButtonSelected]: mt.id === selectedMaterialType?.id,
            })}
            key={mt.id}
            onClick={() => setMaterialType(mt)}
          >
            {mt.attributes?.name}
          </Button>
        ))}
      </div>
      <div className={styles.materials}>
        {filteredMaterials.map((m) => (
          <Material key={m.id} material={m} />
        ))}
      </div>
    </div>
  );
};
