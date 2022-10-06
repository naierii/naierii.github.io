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
  materialType: Maybe<MaterialTypeEntity>;
}

export const MaterialType = ({ className, materialType }: MaterialTypeProps) => {
  const rootClassName = cn(styles.materialType, className);
  const setColourGroups = useMaterialGroupStore((state) => state.setColourGroups);

  const { data } = useGetMaterialsQuery(
    graphQLClient,
    { filters: { type: { id: { eq: materialType?.id } } } },
    {
      select: (data) => data.materials?.data as MaterialEntity[],
    },
  );

  const colourGroups = useMemo(
    () => data?.flatMap((d) => d.attributes?.colourGroups?.data),
    [data],
  ) as MaterialColourGroupEntity[];

  useEffect(() => {
    if (colourGroups?.length) {
      setColourGroups(colourGroups);
    }
  }, [colourGroups]);

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
