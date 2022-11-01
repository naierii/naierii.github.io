import Image from '@components/ui/Image';
import { useCurrentGraphics } from '@context/CurrentGraphicsContext';
import { FlagFragment, useGetFlagsQuery } from '@graphql/generated/graphql';
import { FlagCustomiser, useCustomiserStore } from '@store/customiser';

import styles from './NavFlags.module.scss';

export interface NavFlagsSelectProps {
  editFlag?: FlagCustomiser;
  setSelectModel: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavFlagsSelect = ({ editFlag, setSelectModel }: NavFlagsSelectProps) => {
  const addFlag = useCustomiserStore((state) => state.addFlag);
  const { setGraphic } = useCurrentGraphics();

  const { data: flags } = useGetFlagsQuery(
    {
      pagination: { limit: 500 },
    },
    {
      select: (data) => data?.flags?.data,
    },
  );

  const flagSelected = (flag: FlagFragment) => {
    addFlag(flag);
    setGraphic({
      imageurl: flag.attributes?.image.data?.attributes?.url,
    });
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
