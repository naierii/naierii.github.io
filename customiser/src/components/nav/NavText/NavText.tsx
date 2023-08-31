import Button from '@components/ui/Button';
import { useCustomiserStore } from '@store/customiser';
import { startTransition, useEffect, useMemo, useState } from 'react';
import NavButtons from '../NavButtons';
import NavDecalAdjust from '../NavDecalAdjust';
import NavEditButtons from '../NavEditButtons';

import styles from './NavText.module.scss';
import NavTextNameTypes from './NavTextNameTypes';
import NavTextSelect from './NavTextSelect';
import NavTextText from './NavTextText';

// export interface NavTextProps {

// }

const NavText = () => {
  const texts = useCustomiserStore((state) => state.texts);
  const updateText = useCustomiserStore((state) => state.updateText);
  const editText = useMemo(() => texts?.find((g) => g.edit), [texts]);
  const [showSelector, setShowSelector] = useState(editText?.key !== undefined);

  useEffect(() => {
    if (editText?.key) {
      setShowSelector(true);
    } else {
      setShowSelector(false);
    }
  }, [editText]);

  const addText = () => {
    setShowSelector(true);
  };

  const setScale = (event: number) => {
    startTransition(() => {
      if (editText?.key) updateText(editText.key, { decalScale: Number(event) });
    });
  };

  const setRotation = (event: number) => {
    startTransition(() => {
      if (editText?.key) updateText(editText.key, { decalRotation: Number(event) });
    });
  };

  const applyText = () => {
    if (editText?.key) {
      updateText(editText.key, {
        decalFreeze: false,
        edit: false,
      });
    }

    setShowSelector(false);
  };

  return (
    <>
      {showSelector ? (
        <>
          <NavTextSelect editText={editText} />
          <NavDecalAdjust
            scale={editText?.decalScale}
            rotation={editText?.decalRotation}
            onScale={setScale}
            onRotate={setRotation}
          />
          <NavTextNameTypes editText={editText} />
          <NavEditButtons disabled={!editText} onApply={applyText} />
        </>
      ) : (
        <>
          <div className={styles.customiserFlags}>
            <h3>Your Text</h3>
            {texts.map((t) => (
              <NavTextText key={t.key} text={t} setShowSelector={setShowSelector} />
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
