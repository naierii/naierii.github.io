import FormInput from '@components/ui/FormInput';
import FormSelect from '@components/ui/FormSelect';
import getSizeVariation from '@services/size';
import { UNIT } from '@store/constants';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { m } from 'framer-motion';
import { ChangeEvent, useEffect } from 'react';
import NavButtons from '../NavButtons';
import styles from './NavSize.module.scss';

export interface NavSizeProps {
  className?: string;
}

const NavSize = ({ className }: NavSizeProps) => {
  const rootClassName = cn(styles.root, className);
  const variations = useCustomiserStore((state) => state.variations);
  const setSizing = useCustomiserStore((state) => state.setSizing);
  const weight = useCustomiserStore((state) => state.sizing?.weight);
  const height = useCustomiserStore((state) => state.sizing?.height);
  const variation = useCustomiserStore((state) => state.sizing?.variation);

  useEffect(() => {
    if (weight?.value && weight.unit) {
      const variation = getSizeVariation(weight.unit, weight.value, variations);
      setSizing(undefined, undefined, variation);
    }
  }, [weight, variations]);

  const onHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSizing({ value: Number(e.target.value), unit: 'CM' });
  };

  const onWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSizing(undefined, { value: Number(e.target.value), unit: 'KGS' });
  };

  const onVariationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const selectedVariation = variations.find((v) => v.id === id);
    setSizing(undefined, undefined, selectedVariation);
  };

  const setHeightUnit = (unit: string) => {
    setSizing({ value: height?.value, unit });
  };

  const setWeightUnit = (unit: string) => {
    setSizing(undefined, { value: weight?.value, unit });
  };

  return (
    <>
      <m.div
        className={rootClassName}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h3>Size Details</h3>
        <p>
          To help us make sure the size you’ve selected is correct, enter your height and weight
          below.
        </p>
        <FormInput
          type='number'
          placeholder='Enter Height'
          step='0.1'
          required
          value={height?.value ? height.value : ''}
          onChange={onHeightChange}
        >
          <div className={styles.unitToggle}>
            <button
              className={cn(styles.toggleButton, {
                [styles.toggleButtonSelected]: height?.unit === UNIT.HEIGHT.CM,
              })}
              onClick={() => setHeightUnit(UNIT.HEIGHT.CM)}
            >
              {UNIT.HEIGHT.CM}
            </button>
            {'/'}
            <button
              className={cn(styles.toggleButton, {
                [styles.toggleButtonSelected]: height?.unit === UNIT.HEIGHT.INCH,
              })}
              onClick={() => setHeightUnit(UNIT.HEIGHT.INCH)}
            >
              {UNIT.HEIGHT.INCH}
            </button>
          </div>
        </FormInput>
        <FormInput
          type='number'
          placeholder='Enter Weight'
          step='0.1'
          required
          value={weight?.value ? weight.value : ''}
          onChange={onWeightChange}
        >
          <div className={styles.unitToggle}>
            <button
              className={cn(styles.toggleButton, {
                [styles.toggleButtonSelected]: weight?.unit === UNIT.WEIGHT.KG,
              })}
              onClick={() => setWeightUnit(UNIT.WEIGHT.KG)}
            >
              {UNIT.WEIGHT.KG}
            </button>
            {'/'}
            <button
              className={cn(styles.toggleButton, {
                [styles.toggleButtonSelected]: weight?.unit === UNIT.WEIGHT.LB,
              })}
              onClick={() => setWeightUnit(UNIT.WEIGHT.LB)}
            >
              {UNIT.WEIGHT.LB}
            </button>
          </div>
        </FormInput>
        <h3>Suggested Size</h3>
        <FormSelect value={variation?.id} onChange={onVariationChange}>
          {variations.map((v) => (
            <option key={v.id} value={v.id}>
              {v.title}
            </option>
          ))}
        </FormSelect>
      </m.div>
      <NavButtons />
    </>
  );
};

export default NavSize;
