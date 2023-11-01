import { NameEntity, useGetNamesQuery } from '@graphql/generated/graphql';
import { graphQLClient } from '@graphql/graphql-client';
import { TextCustomiser, useCustomiserStore } from '@store/customiser';
import { FC, useEffect, useRef, useState } from 'react';

import styles from './NavText.module.scss';
import PillButton from '@components/ui/PillButton';
import Price from '@components/ui/Price';
import cn from 'classnames';

export interface NavTextFinishProps {
  editText?: TextCustomiser;
}

const NavTextFinish: FC<NavTextFinishProps> = ({ editText = {} }) => {
  const { selectedName } = editText;

  const [crystals, setCrystals] = useState<boolean>(editText?.crystalPrice ? true : false);
  const [puff, setPuff] = useState<boolean>(editText?.puffPrice ? true : false);

  const { updateText } = useCustomiserStore();

  if (!selectedName) {
    return null;
  }

  const addCrystals = (add: boolean) => {
    if (editText?.key) {
      setCrystals(add);
      if (add) {
        updateText(editText.key, {
          crystalPrice: {
            price: selectedName.attributes?.crystalPrice?.price,
            quantity: 1,
            shopifyVariantId: selectedName.attributes?.crystalPrice?.shopifyVariantId,
          },
        });
      } else {
        updateText(editText.key, {
          crystalPrice: undefined,
        });
      }
    }
  };

  const addPuff = (add: boolean) => {
    if (editText?.key) {
      setPuff(add);
      if (add) {
        updateText(editText.key, {
          puffPrice: {
            price: selectedName.attributes?.puffPrice?.price,
            quantity: 1,
            shopifyVariantId: selectedName.attributes?.puffPrice?.shopifyVariantId,
          },
        });
      } else {
        updateText(editText.key, {
          puffPrice: undefined,
        });
      }
    }
  };

  return (
    <>
      <div className={styles.finishSelections}>
        <div
          className={cn(styles.finishSelection, {
            [styles.selected]: !crystals,
          })}
          onClick={() => addCrystals(false)}
        >
          No Crystals
          <div className={styles.pricing}>
            {' +'}
            <Price price={0} />
          </div>
        </div>
        <div
          className={cn(styles.finishSelection, {
            [styles.selected]: crystals,
          })}
          onClick={() => addCrystals(true)}
        >
          Add Crystals
          <div className={styles.pricing}>
            {' +'}
            <Price price={selectedName.attributes?.crystalPrice?.price} />
          </div>
        </div>
      </div>
      <div className={styles.finishSelections}>
        <div
          className={cn(styles.finishSelection, { [styles.selected]: !puff })}
          onClick={() => addPuff(false)}
        >
          Flat
          <div className={styles.pricing}>
            {' +'}
            <Price price={0} />
          </div>
        </div>
        <div
          className={cn(styles.finishSelection, { [styles.selected]: puff })}
          onClick={() => addPuff(true)}
        >
          Add 3D Puff
          <div className={styles.pricing}>
            {' +'}
            <Price price={selectedName.attributes?.puffPrice?.price} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavTextFinish;
