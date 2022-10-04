import {
  useGetMaterialsQuery,
  MaterialEntity,
  MaterialGroupEntity,
  MaterialTypeEntity,
  Maybe,
} from '@graphql/generated/graphql';
import graphQLClient from '@graphql/graphql-client';

import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { Suspense } from 'react';

import styles from './MaterialGroup.module.scss';

export interface MaterialProps {
  className?: string;
  material: Maybe<MaterialEntity>;
}

const Material = ({ className, material }: MaterialProps) => {
  const rootClassName = cn(styles.material, className);
  const selectedPart = useCustomiserStore((state) => state.selectedPart);
  const setPart = useCustomiserStore((state) => state.setPart);

  const mapImage = material?.attributes?.images?.find((i) => i?.mapType === 'map');

  const onClick = () => {
    if (selectedPart && material) {
      setPart(selectedPart, material);
    }
  };

  return (
    <button className={rootClassName} onClick={onClick}>
      {mapImage && <img src={mapImage?.image?.data?.attributes?.formats['thumbnail'].url} />}
      <h6>{material?.attributes?.name}</h6>
    </button>
  );
};

export interface MaterialTypeProps {
  className?: string;
  materialType: Maybe<MaterialTypeEntity>;
}

const MaterialType = ({ className, materialType }: MaterialTypeProps) => {
  const rootClassName = cn(styles.materialType, className);

  const { data } = useGetMaterialsQuery(
    graphQLClient,
    { filters: { type: { id: { eq: materialType?.id } } } },
    {
      select: (data) => data.materials?.data as MaterialEntity[],
    },
  );

  if (!data?.length) {
    return null;
  }

  return (
    <div className={rootClassName}>
      <h2>{materialType?.attributes?.name}</h2>
      {data.map((m) => (
        <Material key={m.id} material={m} />
      ))}
    </div>
  );
};

export interface MaterialGroupProps {
  className?: string;
  materialGroup?: Maybe<MaterialGroupEntity>;
}

const MaterialGroup = ({ className, materialGroup }: MaterialGroupProps) => {
  const rootClassName = cn(styles.root, className);

  if (!materialGroup) {
    return null;
  }

  return (
    <div className={rootClassName}>
      {materialGroup.attributes?.materialTypes?.data.map((t) => (
        <Suspense key={t.id} fallback={<div>Loading...</div>}>
          <MaterialType materialType={t} />
        </Suspense>
      ))}
    </div>
  );
};

export default MaterialGroup;
