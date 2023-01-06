import Button from '@components/ui/Button';
import { MaterialFragment, useGetNamesQuery } from '@graphql/generated/graphql';
import { graphQLClient } from '@graphql/graphql-client';
import { useCustomiserStore } from '@store/customiser';
import { ChangeEvent, startTransition, useState } from 'react';
import MaterialGroup from '../MaterialGroup';
import NavButtons from '../NavButtons';
import NavDecalAdjust from '../NavDecalAdjust';
import NavEditButtons from '../NavEditButtons';

import styles from './NavText.module.scss';
import NavTextSelect from './NavTextSelect';
import NavTextText from './NavTextText';

// export interface NavTextProps {

// }

const NavText = () => {
  const texts = useCustomiserStore((state) => state.texts);
  const updateText = useCustomiserStore((state) => state.updateText);
  const editText = texts?.find((g) => g.edit);
  const [showSelector, setShowSelector] = useState(false);
  const [showMover, setShowMover] = useState(false);

  const { data } = useGetNamesQuery(
    graphQLClient,
    {},
    {
      select: (data) => data.names?.data[0],
    },
  );

  const addText = () => {
    setShowSelector(true);
  };

  const setScale = (event: [number, number]) => {
    startTransition(() => {
      if (editText?.key) updateText(editText.key, { decalScale: Number(event[1]) });
    });
  };

  const setRotation = (event: [number, number]) => {
    startTransition(() => {
      if (editText?.key) updateText(editText.key, { decalRotation: Number(event[1]) });
    });
  };

  const setMaterial = (material: MaterialFragment) => {
    if (editText?.key) {
      updateText(editText.key, {
        material,
      });
    }
  };

  const setOutline = (outline: MaterialFragment) => {
    if (editText?.key) {
      updateText(editText.key, {
        outline,
      });
    }
  };

  const applyText = () => {
    if (editText?.key) {
      updateText(editText.key, {
        decalFreeze: false,
        edit: false,
      });
    }

    setShowSelector(false);
    setShowMover(false);
  };

  return (
    <>
      {showSelector ? (
        <NavTextSelect setShowMover={setShowMover} setShowSelector={setShowSelector} />
      ) : showMover ? (
        <>
          <NavDecalAdjust
            scale={editText?.decalScale}
            rotation={editText?.decalRotation}
            onScale={setScale}
            onRotate={setRotation}
          />
          <h4>Colour</h4>
          <MaterialGroup
            materialGroup={data?.attributes?.materialGroup?.data}
            onMaterialSelected={setMaterial}
          />
          <h4>Outline</h4>
          <MaterialGroup
            materialGroup={data?.attributes?.outlineGroup?.data}
            onMaterialSelected={setOutline}
          />
          <NavEditButtons disabled={!editText} onApply={applyText} />
        </>
      ) : (
        <>
          <div className={styles.customiserFlags}>
            <h3>Your Text</h3>
            {texts.map((t) => (
              <NavTextText key={t.key} text={t} setShowMover={setShowMover} />
            ))}
            <Button colour='red' onClick={addText}>
              Add Text
            </Button>
          </div>
          <NavButtons />
        </>
      )}
    </>
  );
};

export default NavText;
