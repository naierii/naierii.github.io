import Image from '@components/ui/Image';
import { FlagFragment, useGetFlagsQuery } from '@graphql/generated/graphql';
import { graphQLClient } from '@graphql/graphql-client';
import { FlagCustomiser, useCustomiserStore } from '@store/customiser';

import styles from './NavFlags.module.scss';

export interface NavFlagsSelectProps {
  editFlag?: FlagCustomiser;
  setShowMover: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavFlagsSelect = ({ editFlag, setShowMover }: NavFlagsSelectProps) => {
  const { addFlag, updateFlag } = useCustomiserStore((state) => state);

  const { data: flags } = useGetFlagsQuery(
    graphQLClient,
    {
      pagination: { limit: 500 },
    },
    {
      select: (data) => data?.flags?.data,
    },
  );

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
    setShowMover(true);
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
