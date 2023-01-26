import Image from '@components/ui/Image';
import { FlagFragment } from '@graphql/generated/graphql';
import { FlagCustomiser, useCustomiserStore } from '@store/customiser';

import styles from './NavFlags.module.scss';

export interface NavFlagsSelectProps {
  editFlag?: FlagCustomiser;
  flags: FlagFragment[];
}

export const NavFlagsSelect = ({ editFlag, flags }: NavFlagsSelectProps) => {
  const { addFlag, updateFlag } = useCustomiserStore((state) => state);

  const flagSelected = (flag: FlagFragment) => {
    if (editFlag?.key) {
      updateFlag(editFlag.key, {
        flag: flag,
        edit: true,
      });
    } else {
      addFlag({
        flag: flag,
      });
    }
  };

  return (
    <div className={styles.flags}>
      {flags?.map((f) => (
        <div className={styles.flag} key={f.id} onClick={() => flagSelected(f)}>
          <Image image={f.attributes?.image.data} />
        </div>
      ))}
    </div>
  );
};
