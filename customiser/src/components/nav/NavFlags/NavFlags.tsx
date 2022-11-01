import { FlagCustomiser, useCustomiserStore } from '@store/customiser';
import { useEffect, useState } from 'react';
import { NavFlagsSelect } from './NavFlagsSelect';

import styles from './NavFlags.module.scss';
import Button from '@components/ui/Button';
import { NavFlagsFlag } from './NavFlagsFlag';
import NavButtons from '../NavButtons';
import NavEditButtons from '../NavEditButtons';

// export interface NavFlagsProps {

// }

const NavFlags = () => {
  const flags = useCustomiserStore((state) => state.flags);
  const editFlag = flags.find((f) => f.editMode);
  const [selectModel, setSelectModel] = useState(false);

  const addFlag = () => {
    setSelectModel(true);
  };

  return (
    <>
      {selectModel ? (
        <>
          <NavFlagsSelect editFlag={editFlag} setSelectModel={setSelectModel} />
          <NavEditButtons editFlag={editFlag} setSelectModel={setSelectModel} />
        </>
      ) : (
        <>
          <div className={styles.customiserFlags}>
            <h3>Your Flags</h3>
            {flags.map((flag) => (
              <NavFlagsFlag key={flag.key} flag={flag} setSelectModel={setSelectModel} />
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
