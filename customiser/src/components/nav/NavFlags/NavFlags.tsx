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
  const [selectModel, setSelectModel] = useState(false);

  const addFlag = () => {
    setSelectModel(true);
  };

  return (
    <>
      {selectModel ? (
        <>
          <NavFlagsSelect editFlag={editGraphic} setSelectModel={setSelectModel} />
          <NavEditButtons editFlag={editGraphic} setSelectModel={setSelectModel} />
        </>
      ) : (
        <>
          <div className={styles.customiserFlags}>
            <h3>Your Flags</h3>
            {graphics?.map((flag) => (
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
