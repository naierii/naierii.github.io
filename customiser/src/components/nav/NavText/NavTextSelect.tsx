import Button from '@components/ui/Button';
import cn from 'classnames';
import { useState } from 'react';
import NavButtons from '../NavButtons';

import styles from './NavText.module.scss';

export interface NavTextSelectProps {
  className?: string;
}

const NavTextSelect = ({ className }: NavTextSelectProps) => {
  const rootClassName = cn(styles.root, className);
  const [showSelector, setShowSelector] = useState(false);

  const addText = () => {
    setShowSelector(true);
  };

  return (
    <>
      {showSelector ? (
        <></>
      ) : (
        <>
          <div className={styles.customiserFlags}>
            <h3>Your Text</h3>
            {/* {graphics?.map((flag) => (
              <NavFlagsFlag key={flag.key} flag={flag} setShowSelector={setShowSelector} />
            ))} */}
            <Button colour='red' onClick={addText}>
              Add Text
            </Button>
          </div>
          <NavButtons />
        </>
      )}
    </>
  );
};

export default NavTextSelect;
