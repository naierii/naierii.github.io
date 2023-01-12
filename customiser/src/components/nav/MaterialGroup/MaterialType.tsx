import PillButton from '@components/ui/PillButton';
import { MaterialFragment } from '@graphql/generated/graphql';
import cn from 'classnames';
import { Material } from './Material';
import styles from './MaterialGroup.module.scss';
import { useMaterialGroupStore } from './MaterialGroupState';

export interface MaterialTypeProps {
  className?: string;
  onMaterialSelected: (material: MaterialFragment) => void;
}

export const MaterialType = ({ className, onMaterialSelected }: MaterialTypeProps) => {
  const rootClassName = cn(styles.materialType, className);
  const filteredMaterials = useMaterialGroupStore((state) => state.filteredMaterials());
  const materialTypes = useMaterialGroupStore((state) => state.materialTypes);
  const selectedMaterialType = useMaterialGroupStore((state) => state.selectedMaterialType);
  const setMaterialType = useMaterialGroupStore((state) => state.setMaterialType);
  return (
    <div className={rootClassName}>
      <h5>Texture</h5>
      <div className={styles.materialTypes}>
        {materialTypes.map((mt) => (
          <PillButton
            key={mt.id}
            onClick={() => setMaterialType(mt)}
            selected={mt.id === selectedMaterialType?.id}
          >
            {mt.attributes?.name}
          </PillButton>
        ))}
      </div>

      <div className={styles.materials}>
        {filteredMaterials.map((m) => (
          <Material key={m.id} material={m} onMaterialSelected={onMaterialSelected} />
        ))}
      </div>
    </div>
  );
};
