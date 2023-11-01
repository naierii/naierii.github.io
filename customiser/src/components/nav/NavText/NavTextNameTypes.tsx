import PillButton from '@components/ui/PillButton';
import Price from '@components/ui/Price';
import { MaterialFragment, NameEntity, useGetNamesQuery } from '@graphql/generated/graphql';
import { graphQLClient } from '@graphql/graphql-client';
import { TextCustomiser, useCustomiserStore } from '@store/customiser';
import { useState, useEffect, useRef } from 'react';
import MaterialGroup from '../MaterialGroup';

import styles from './NavText.module.scss';
import cn from 'classnames';

export interface NavTextNameTypesProps {
  editText?: TextCustomiser;
}

const NavTextNameTypes = ({ editText = {} }: NavTextNameTypesProps) => {
  const updateText = useCustomiserStore((state) => state.updateText);

  const { selectedName } = editText;
  const prevSelectedName = useRef(selectedName);

  const { data: names } = useGetNamesQuery(
    graphQLClient,
    {},
    {
      select: (data) => data.names?.data,
    },
  );

  useEffect(() => {
    if (!selectedName && names?.length && editText?.key) {
      updateText(editText.key, {
        selectedName: names[0],
      });
    }
  }, [names]);

  useEffect(() => {
    if (editText?.key && selectedName && prevSelectedName.current !== selectedName) {
      prevSelectedName.current = selectedName;

      updateText(editText.key, {
        basePrice: {
          price: selectedName.attributes?.basePrice?.price,
          quantity: 1,
          shopifyVariantId: selectedName.attributes?.basePrice?.shopifyVariantId,
        },
        letterPrice: {
          price: selectedName.attributes?.letterPrice?.price,
          quantity: 1,
          shopifyVariantId: selectedName.attributes?.letterPrice?.shopifyVariantId,
        },
        nameType: {
          id: selectedName.id,
          name: selectedName.attributes?.name,
        },
        /**
         * Reset material when selectedName changes.
         *
         * Different name types would have different
         * material groups.
         */
        material: undefined,
        ...(editText.outline
          ? {
              outlinePrice: {
                price: selectedName.attributes?.outlinePrice?.price,
                quantity: 1,
                shopifyVariantId: selectedName.attributes?.outlinePrice?.shopifyVariantId,
              },
            }
          : {}),
      });
    }
  }, [selectedName]);

  if (!selectedName) {
    return null;
  }

  const setMaterial = (material: MaterialFragment) => {
    if (editText?.key) {
      updateText(editText.key, {
        material,
      });
    }
  };

  const setSelectedName = (name: NameEntity) => {
    if (editText?.key) {
      updateText(editText.key, {
        selectedName: name,
      });
    }
  };

  console.log(selectedName);

  return (
    <>
      <div className={styles.finishSelections}>
        {names?.map((n) => (
          <div
            key={n.id}
            className={cn(styles.finishSelection, {
              [styles.selected]: n.id === selectedName.id,
            })}
            onClick={() => setSelectedName(n)}
          >
            {n.attributes?.name}
            <div className={styles.pricing}>
              <Price price={n.attributes?.basePrice?.price} />
              {' + '}
              <Price price={n.attributes?.letterPrice?.price} /> per letter
            </div>
          </div>
        ))}
      </div>
      <MaterialGroup
        hideColorGroups={true}
        materialGroup={selectedName?.attributes?.materialGroup?.data}
        materialType={editText?.material?.attributes?.type?.data}
        colourGroup={editText?.material?.attributes?.colourGroups?.data[0]}
        onMaterialSelected={setMaterial}
        className={styles.materialGroup}
      />
    </>
  );
};

export default NavTextNameTypes;
