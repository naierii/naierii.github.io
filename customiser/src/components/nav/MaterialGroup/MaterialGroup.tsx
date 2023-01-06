import {
  InputMaybe,
  MaterialColourGroupEntity,
  MaterialEntity,
  MaterialFragment,
  MaterialGroupEntity,
  MaterialTypeEntity,
  Maybe,
  useGetMaterialsQuery,
} from '@graphql/generated/graphql';
import { graphQLClient } from '@graphql/graphql-client';

import cn from 'classnames';
import { useEffect } from 'react';

import styles from './MaterialGroup.module.scss';
import { createStore, Provider, useMaterialGroupStore } from './MaterialGroupState';
import { MaterialType } from './MaterialType';

export interface MaterialGroupProps {
  className?: string;
  materialGroup?: Maybe<MaterialGroupEntity>;
  materialType?: Maybe<MaterialTypeEntity>;
  colourGroup?: Maybe<MaterialColourGroupEntity>;
  onMaterialSelected: (material: MaterialFragment) => void;
}

const MaterialGroupLoader = ({
  className,
  materialGroup,
  materialType,
  colourGroup,
  onMaterialSelected,
}: MaterialGroupProps) => {
  const colourGroups = useMaterialGroupStore((state) => state.colourGroups);
  const selectedColourGroup = useMaterialGroupStore((state) => state.selectedColourGroup);
  const setMaterials = useMaterialGroupStore((state) => state.setMaterials);
  const setColourGroup = useMaterialGroupStore((state) => state.setColourGroup);
  const rootClassName = cn(styles.root, className);

  const typeIds = materialGroup?.attributes?.materialTypes
    ? (materialGroup.attributes.materialTypes.data.map((t) => t.id) as InputMaybe<string>[])
    : [];

  const { data: materials } = useGetMaterialsQuery(
    graphQLClient,
    { filters: { type: { id: { in: typeIds } } }, pagination: { pageSize: 200 } },
    {
      select: (data) => data.materials?.data as MaterialEntity[],
    },
  );

  useEffect(() => {
    if (materials?.length) {
      setMaterials(materials, materialType, colourGroup);
    }
  }, [materials]);

  if (!materialGroup) {
    return null;
  }

  return (
    <div className={rootClassName}>
      <h3>Colour</h3>
      <div className={styles.colourGroups}>
        {colourGroups.map((group) => (
          <button key={group.id} onClick={() => setColourGroup(group)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 42 42'
              strokeWidth={4}
              stroke={
                selectedColourGroup?.id === group.id ? '#000' : group.attributes?.colour ?? '#000'
              }
              fill={group.attributes?.colour ?? '#000'}
            >
              <rect width='100%' height='100%' />
            </svg>
          </button>
        ))}
      </div>
      <MaterialType onMaterialSelected={onMaterialSelected} />
    </div>
  );
};

const MaterialGroup = (props: MaterialGroupProps) => {
  return (
    <Provider createStore={createStore}>
      <MaterialGroupLoader {...props} />
    </Provider>
  );
};

export default MaterialGroup;
