import PillButton from '@components/ui/PillButton';
import Price from '@components/ui/Price';
import { MaterialFragment, NameEntity, useGetNamesQuery } from '@graphql/generated/graphql';
import { graphQLClient } from '@graphql/graphql-client';
import { TextCustomiser, useCustomiserStore } from '@store/customiser';
import { useState, useEffect } from 'react';
import MaterialGroup from '../MaterialGroup';

import styles from './NavText.module.scss';

export interface NavTextNameTypesProps {
  editText?: TextCustomiser;
}

const NavTextNameTypes = ({ editText }: NavTextNameTypesProps) => {
  const [selectedName, setSelectedName] = useState<NameEntity>();
  const [showOutline, setShowOutline] = useState<boolean>(editText?.outline ? true : false);
  const updateText = useCustomiserStore((state) => state.updateText);

  console.log({ selectedName });

  const { data: names } = useGetNamesQuery(
    graphQLClient,
    {},
    {
      select: (data) => data.names?.data,
    },
  );

  console.log(names);

  useEffect(() => {
    if (!selectedName && names?.length) {
      setSelectedName(names[0]);
    }
  }, [names]);

  if (!selectedName) {
    return null;
  }

  const setMaterial = (material: MaterialFragment) => {
    if (editText?.key) {
      updateText(editText.key, {
        material,
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
      });
    }
  };

  const setOutline = (outline: MaterialFragment) => {
    if (editText?.key) {
      updateText(editText.key, {
        outline,
        outlinePrice: {
          price: selectedName.attributes?.outlinePrice?.price,
          quantity: 1,
          shopifyVariantId: selectedName.attributes?.outlinePrice?.shopifyVariantId,
        },
        nameType: {
          id: selectedName.id,
          name: selectedName.attributes?.name,
        },
      });
    }
  };

  const updateOutline = (show: boolean) => {
    setShowOutline(show);
    if (!show && editText?.key) {
      updateText(editText.key, {
        outline: undefined,
        outlinePrice: undefined,
      });
    }
  };

  return (
    <>
      <div className={styles.nameTypes}>
        {names?.map((n) => (
          <div key={n.id} className={styles.nameType}>
            <PillButton selected={n.id === selectedName.id} onClick={() => setSelectedName(n)}>
              {n.attributes?.name}
            </PillButton>
            <div className={styles.nameTypePricing}>
              <Price price={n.attributes?.basePrice?.price} />
              {' + '}
              <br />
              <Price price={n.attributes?.letterPrice?.price} /> per letter
            </div>
          </div>
        ))}
      </div>
      <h4>Text Colour</h4>
      <MaterialGroup
        materialGroup={selectedName?.attributes?.materialGroup?.data}
        materialType={editText?.material?.attributes?.type?.data}
        colourGroup={editText?.material?.attributes?.colourGroups?.data[0]}
        onMaterialSelected={setMaterial}
        className={styles.materialGroup}
      />
      <div className={styles.showOutline}>
        <PillButton onClick={() => updateOutline(!showOutline)} selected={showOutline}>
          Add Outline
        </PillButton>
        + <Price price={selectedName.attributes?.outlinePrice?.price} />
      </div>
      {showOutline && (
        <>
          <h4>Outline Colour</h4>
          <MaterialGroup
            materialGroup={selectedName?.attributes?.outlineGroup?.data}
            materialType={editText?.outline?.attributes?.type?.data}
            colourGroup={editText?.outline?.attributes?.colourGroups?.data[0]}
            onMaterialSelected={setOutline}
            className={styles.materialGroup}
          />
        </>
      )}
    </>
  );
};

export default NavTextNameTypes;
