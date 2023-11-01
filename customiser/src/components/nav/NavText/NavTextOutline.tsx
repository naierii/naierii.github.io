import { TextCustomiser, useCustomiserStore } from '@store/customiser';
import { FC, useEffect, useState } from 'react';

import PillButton from '@components/ui/PillButton';
import Price from '@components/ui/Price';
import { MaterialFragment } from '@graphql/generated/graphql';
import MaterialGroup from '../MaterialGroup';
import styles from './NavText.module.scss';
import cn from 'classnames';

export interface NavTextOutlineProps {
  editText?: TextCustomiser;
}

const NavTextOutline: FC<NavTextOutlineProps> = ({ editText = {} }) => {
  const [showOutline, setShowOutline] = useState<boolean>(editText?.outline ? true : false);

  const { updateText } = useCustomiserStore();

  const { selectedName } = editText;

  if (!selectedName) {
    return null;
  }

  const setOutline = (outline: MaterialFragment) => {
    if (editText?.key) {
      updateText(editText.key, {
        outline,
        outlinePrice: {
          price: selectedName.attributes?.outlinePrice?.price,
          quantity: 1,
          shopifyVariantId: selectedName.attributes?.outlinePrice?.shopifyVariantId,
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
      <div className={cn(styles.showOutline, styles.finishSelections)}>
        <div
          className={cn(styles.finishSelection, { [styles.selected]: !showOutline })}
          onClick={() => updateOutline(false)}
        >
          No Outline
          <div className={styles.pricing}>
            {' +'}
            <Price price={0} />
          </div>
        </div>
        <div
          className={cn(styles.finishSelection, { [styles.selected]: showOutline })}
          onClick={() => updateOutline(true)}
        >
          Add Outline
          <div className={styles.pricing}>
            {' +'}
            <Price price={selectedName.attributes?.outlinePrice?.price} />
          </div>
        </div>
      </div>
      {showOutline && (
        <>
          <MaterialGroup
            hideColorGroups
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

export default NavTextOutline;
