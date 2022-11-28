import Image from '@components/ui/Image';
import { GraphicsContextGraphic, useGraphics } from '@context/GraphicsContext';
import { FlagFragment, useGetFlagsQuery } from '@graphql/generated/graphql';
import { graphQLClient } from '@graphql/graphql-client';
import { EDIT_MODE } from '@store/constants';
import { FlagCustomiser, useCustomiserStore } from '@store/customiser';

import styles from './NavFlags.module.scss';

export interface NavFlagsSelectProps {
  editFlag?: GraphicsContextGraphic;
  setShowSelector: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavFlagsSelect = ({
  editFlag,
  setShowSelector: setSelectModel,
}: NavFlagsSelectProps) => {
  const { addGraphic, updateGraphic } = useGraphics();

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
      updateGraphic(editFlag.key, {
        flag: flag,
        editMode: EDIT_MODE.EDIT_2D,
        freeze: false,
      });
    } else {
      addGraphic({
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
