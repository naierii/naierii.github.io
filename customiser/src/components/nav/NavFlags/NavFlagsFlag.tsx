import Image from '@components/ui/Image';

import { FlagCustomiser, useCustomiserStore } from '@store/customiser';
import { Dispatch, SetStateAction } from 'react';
import NavOptionEdit from '../NavOptionEdit';
import styles from './NavFlags.module.scss';

export interface NavFlagsFlagProps {
  flag: FlagCustomiser;
  setShowSelector: Dispatch<SetStateAction<boolean>>;
}

export const NavFlagsFlag = ({ flag, setShowSelector: setSelectModel }: NavFlagsFlagProps) => {
  const { updateFlag, deleteFlag } = useCustomiserStore((state) => state);

  const editItem = () => {
    if (flag.key) {
      updateFlag(flag.key, { edit: true });
    }
    setSelectModel(true);
  };

  const deleteItem = () => {
    if (flag.key) {
      deleteFlag(flag.key);
    }
  };

  return (
    <div className={styles.flagItem}>
      <div className={styles.flagItemImage}>
        <Image image={flag.flag?.attributes?.image.data} />
      </div>
      <NavOptionEdit onEdit={editItem} onDelete={deleteItem} />
    </div>
  );
};
