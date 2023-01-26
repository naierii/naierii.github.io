import { startTransition, useState } from 'react';
import { NavFlagsSelect } from './NavFlagsSelect';

import Button from '@components/ui/Button';
import { useCustomiserStore } from '@store/customiser';
import NavButtons from '../NavButtons';
import NavDecalAdjust from '../NavDecalAdjust';
import NavEditButtons from '../NavEditButtons';
import styles from './NavFlags.module.scss';
import { NavFlagsFlag } from './NavFlagsFlag';
import { useGetFlagsQuery } from '@graphql/generated/graphql';
import { graphQLClient } from '@graphql/graphql-client';

const NavFlags = () => {
  const flags = useCustomiserStore((state) => state.flags);
  const updateFlag = useCustomiserStore((state) => state.updateFlag);
  const editFlag = flags?.find((g) => g.edit);

  const [showSelector, setShowSelector] = useState(false);

  const { data: flagQuery } = useGetFlagsQuery(
    graphQLClient,
    {
      pagination: { limit: 500 },
    },
    {
      select: (data) => ({ flags: data.flags?.data, prices: data.graphicPrices?.data }),
    },
  );

  const addFlag = () => {
    setShowSelector(true);
  };

  const setScale = (event: number) => {
    if (editFlag?.key) updateFlag(editFlag.key, { decalScale: Number(event) });
  };

  const setRotation = (event: number) => {
    startTransition(() => {
      if (editFlag?.key) updateFlag(editFlag.key, { decalRotation: Number(event) });
    });
  };

  const applyFlag = () => {
    if (editFlag?.key) {
      updateFlag(editFlag.key, {
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
          <NavDecalAdjust
            scale={editFlag?.decalScale}
            rotation={editFlag?.decalRotation}
            onScale={setScale}
            onRotate={setRotation}
            prices={flagQuery?.prices}
          />
          {flagQuery?.flags && <NavFlagsSelect editFlag={editFlag} flags={flagQuery.flags} />}
          <NavEditButtons disabled={!editFlag} onApply={applyFlag} />
        </>
      ) : (
        <>
          <div className={styles.customiserFlags}>
            <h3>Your Flags</h3>
            {flags?.map((flag) => (
              <NavFlagsFlag key={flag.key} flag={flag} setShowSelector={setShowSelector} />
            ))}
            <Button colour='red' onClick={addFlag}>
              Add Flag
            </Button>
          </div>
          <NavButtons />
        </>
      )}
    </>
  );
};

export default NavFlags;
