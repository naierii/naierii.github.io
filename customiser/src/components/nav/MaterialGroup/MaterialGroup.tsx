import { MaterialGroupEntity, Maybe } from '@graphql/generated/graphql';

import cn from 'classnames';

import styles from './MaterialGroup.module.scss';
import { useMaterialGroupStore } from './MaterialGroupState';
import { MaterialType } from './MaterialType';

export interface MaterialGroupProps {
  className?: string;
  materialGroup?: Maybe<MaterialGroupEntity>;
}

const MaterialGroup = ({ className, materialGroup }: MaterialGroupProps) => {
  const colourGroups = useMaterialGroupStore((state) => state.colourGroups);
  const rootClassName = cn(styles.root, className);

  if (!materialGroup) {
    return null;
  }

  return (
    <div className={rootClassName}>
      {colourGroups.map((group) => group.attributes?.name)}

      {materialGroup.attributes?.materialTypes?.data.map((t) => (
        <MaterialType key={t.id} materialType={t} />
      ))}
    </div>
  );
};

export default MaterialGroup;
