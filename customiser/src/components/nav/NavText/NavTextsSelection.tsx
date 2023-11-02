import { FC } from 'react';

import Button from '@components/ui/Button';
import { useCustomiserStore } from '@store/customiser';
import NavButtons from '../NavButtons';
import styles from './NavText.module.scss';
import NavTextText from './NavTextText';

type NavTextsSelectionProps = {
  onAddTextClicked?: () => void;
  onTextSelected?: () => void;
};

const NavTextsSelection: FC<NavTextsSelectionProps> = ({ onAddTextClicked, onTextSelected }) => {
  const texts = useCustomiserStore((state) => state.texts);

  return (
    <div className={styles.navTextsSelection}>
      <div className={styles.title}>
        <h3 className={styles.titleText}>Your Texts</h3>

        <Button colour='red' onClick={onAddTextClicked}>
          Add Text
        </Button>
      </div>

      {texts.map((t) => (
        <NavTextText key={t.key} text={t} setShowSelector={onTextSelected} />
      ))}

      <NavButtons></NavButtons>
    </div>
  );
};

export default NavTextsSelection;
