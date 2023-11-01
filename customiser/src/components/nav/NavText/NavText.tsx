import Button from '@components/ui/Button';
import { useCustomiserStore } from '@store/customiser';
import { startTransition, useEffect, useMemo, useState } from 'react';
import NavButtons from '../NavButtons';
import NavDecalAdjust from '../NavDecalAdjust';

import styles from './NavText.module.scss';
import NavTextNameTypes from './NavTextNameTypes';
import NavTextSelect from './NavTextSelect';
import NavTextText from './NavTextText';
import Accordion from '@components/ui/Accordion/Accordion';
import NavTextFinish from './NavTextFinish';
import NavTextOutline from './NavTextOutline';
import NavStepButtons from '../NavStepButtons';
import { useFrame } from '@react-three/fiber';

// export interface NavTextProps {

// }

const NavText = () => {
  const [step, setStep] = useState<number | undefined>(0);

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

    setStep(0);

    setShowSelector(false);
  };

  const handleTitleClick = (_step: number | string) => {
    if (_step === step) {
      setStep(undefined);
    } else {
      setStep(_step as number);
    }
  };

  const maxStep = 4;

  const handleNext = () => {
    if (step === undefined) {
      setStep(0);
    } else if (step < maxStep - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step === undefined) {
      setStep(0);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <>
      {showSelector ? (
        <div className={styles.navTextEdit}>
          <div id='TestView'>
            <img height={200} style={{ width: '100%' }}></img>
          </div>
          <Accordion
            step={0}
            title='Text and Font'
            currentStep={step ?? -1}
            onTitleClick={handleTitleClick}
          >
            <NavTextSelect editText={editText} />
          </Accordion>
          <Accordion
            step={1}
            title='Text Color'
            currentStep={step ?? -1}
            onTitleClick={handleTitleClick}
          >
            <NavTextNameTypes editText={editText} />
          </Accordion>
          <Accordion
            step={2}
            title='Finish'
            currentStep={step ?? -1}
            onTitleClick={handleTitleClick}
          >
            <NavTextFinish editText={editText}></NavTextFinish>
          </Accordion>

          <Accordion
            step={3}
            title='Outline'
            currentStep={step ?? -1}
            onTitleClick={handleTitleClick}
          >
            <NavTextOutline editText={editText} />
          </Accordion>

          <NavStepButtons
            step={step}
            maxStep={maxStep - 1}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onApply={applyText}
          />

          <NavDecalAdjust
            scale={editText?.decalScale}
            rotation={editText?.decalRotation}
            onScale={setScale}
            onRotate={setRotation}
          />
        </div>
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
