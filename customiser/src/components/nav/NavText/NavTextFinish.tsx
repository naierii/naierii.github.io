import { TextCustomiser, useCustomiserStore } from '@store/customiser';
import { FC, useEffect, useMemo, useState } from 'react';

import Price from '@components/ui/Price';
import { NAME_TYPE_LUXURY_ID } from '@store/constants';
import cn from 'classnames';
import styles from './NavText.module.scss';

export interface NavTextFinishProps {
  editText?: TextCustomiser;
}

const NavTextFinish: FC<NavTextFinishProps> = ({ editText = {} }) => {
  const { selectedName } = editText;

  const [crystals, setCrystals] = useState<boolean>(editText?.crystalPrice ? true : false);
  const [puff, setPuff] = useState<boolean>(editText?.puffPrice ? true : false);

  const hasPuffOption = useMemo(() => selectedName?.id === NAME_TYPE_LUXURY_ID, [selectedName]);

  const { updateText } = useCustomiserStore();

  useEffect(() => {
    setPuff(editText.puffPrice ? true : false);
  }, [editText.puffPrice]);

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
          className={cn(styles.finishSelection, {
            [styles.selected]: puff,
            [styles.disabled]: !hasPuffOption,
          })}
          onClick={() => addPuff(true)}
        >
          Add 3D Puff
          {hasPuffOption ? (
            <div className={styles.pricing}>
              {' +'}
              <Price price={selectedName.attributes?.puffPrice?.price} />
            </div>
          ) : (
            <div className={styles.pricing}>(Only available for luxury colors)</div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavTextFinish;
