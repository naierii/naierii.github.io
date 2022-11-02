import { useState } from 'react';
import { NavFlagsSelect } from './NavFlagsSelect';

import Button from '@components/ui/Button';
import { useGraphics } from '@context/GraphicsContext';
import NavButtons from '../NavButtons';
import NavEditButtons from '../NavEditButtons';
import styles from './NavFlags.module.scss';
import { NavFlagsFlag } from './NavFlagsFlag';

// export interface NavFlagsProps {

// }

const NavFlags = () => {
  const { graphics } = useGraphics();
  const editGraphic = graphics?.find((g) => g.edit);
  const [showSelector, setShowSelector] = useState(false);

  const addFlag = () => {
    setShowSelector(true);
  };

  return (
    <>
      {showSelector ? (
        <>
          <NavFlagsSelect editFlag={editGraphic} setShowSelector={setShowSelector} />
          <NavEditButtons editFlag={editGraphic} setShowSelector={setShowSelector} />
        </>
      ) : (
        <>
          <div className={styles.customiserFlags}>
            <h3>Your Flags</h3>
            {graphics?.map((flag) => (
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
