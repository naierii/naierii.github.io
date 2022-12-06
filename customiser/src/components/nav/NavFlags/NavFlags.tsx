import { useState } from 'react';
import { NavFlagsSelect } from './NavFlagsSelect';

import Button from '@components/ui/Button';
import { useCustomiserStore } from '@store/customiser';
import NavButtons from '../NavButtons';
import NavEditButtons from '../NavEditButtons';
import styles from './NavFlags.module.scss';
import { NavFlagsFlag } from './NavFlagsFlag';
import { NavFlagsMove } from './NavFlagsMove';

// export interface NavFlagsProps {

// }

const NavFlags = () => {
  const flags = useCustomiserStore((state) => state.flags);
  const editGraphic = flags?.find((g) => g.edit);
  const [showSelector, setShowSelector] = useState(false);
  const [showMover, setShowMover] = useState(false);

  const addFlag = () => {
    setShowSelector(true);
  };

  return (
    <>
      {showSelector && !showMover ? (
        <>
          <NavFlagsSelect editFlag={editGraphic} setShowMover={setShowMover} />
        </>
      ) : showMover ? (
        <>
          <NavFlagsMove />
          <NavEditButtons
            editFlag={editGraphic}
            setShowSelector={setShowSelector}
            setShowMover={setShowMover}
          />
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
