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

  const { materialTypes, filteredMaterials: getFilteredMaterials } = useMaterialGroupStore();

  const filteredMaterials = getFilteredMaterials();

  return (
    <div className={rootClassName}>
      <h5>Texture</h5>
      {materialTypes.map((mt) => (
        <div key={mt.id} className={styles.materialType}>
          <h6 className={styles.materialType__title}>{mt.attributes?.name}</h6>
          <div className={styles.materials}>
            {filteredMaterials
              .filter((m) => m.attributes?.type?.data?.id === mt.id)
              .map((m) => (
                <Material key={m.id} material={m} onMaterialSelected={onMaterialSelected} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
