import FormInput from '@components/ui/FormInput';
import { useCustomiserStore } from '@store/customiser';
import { ChangeEvent, startTransition } from 'react';
import styles from './NavFlags.module.scss';

export interface NavFlagsMoveProps {
  onScale?: () => void;
  onRotate?: () => void;
}

export const NavFlagsMove = () => {
  const editFlag = useCustomiserStore((state) => state.flags.find((f) => f.edit));
  const { updateFlag } = useCustomiserStore((state) => state);

  const setScale = (event: ChangeEvent<HTMLInputElement>) => {
    if (editFlag?.key) updateFlag(editFlag.key, { decalScale: Number(event.target.value) });
  };

  const setRotation = (event: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      if (editFlag?.key) updateFlag(editFlag.key, { decalRotation: Number(event.target.value) });
    });
  };

  return (
    <div className={styles.flagItem}>
      <FormInput type='number' placeholder='Scale' onChange={setScale} />
      <FormInput
        type='number'
        placeholder='Rotate'
        value={editFlag?.decalRotation}
        onChange={setRotation}
      />
    </div>
  );
};
