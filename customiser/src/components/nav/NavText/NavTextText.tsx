import { TextCustomiser, useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import NavOptionEdit from '../NavOptionEdit';

import styles from './NavText.module.scss';

export interface NavTextTextProps {
  text: TextCustomiser;
  className?: string;
  setShowSelector: Dispatch<SetStateAction<boolean>>;
}

const NavTextText = ({ className, text, setShowSelector }: NavTextTextProps) => {
  const { updateText, deleteText } = useCustomiserStore((state) => state);
  const rootClassName = cn(styles.root, className);

  const editItem = () => {
    if (text.key) {
      updateText(text.key, { edit: true });
      setShowSelector(true);
    }
  };

  const deleteItem = () => {
    if (text.key) {
      deleteText(text.key);
    }
  };

  return (
    <div className={styles.textItem}>
      <div className={styles.textItemText}>{text.text}</div>
      <NavOptionEdit onEdit={editItem} onDelete={deleteItem} />
    </div>
  );
};

export default NavTextText;
