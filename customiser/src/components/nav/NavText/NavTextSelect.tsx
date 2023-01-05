import Button from '@components/ui/Button';
import FormInput from '@components/ui/FormInput';
import { TextCustomiser, useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { ChangeEvent, useState } from 'react';

import styles from './NavText.module.scss';

export interface NavTextSelectProps {
  className?: string;
  editText?: TextCustomiser;
  setShowMover: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSelector: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavTextSelect = ({
  className,
  editText,
  setShowMover,
  setShowSelector,
}: NavTextSelectProps) => {
  const [text, setText] = useState<string>();
  const { addText, updateText } = useCustomiserStore((state) => state);
  const rootClassName = cn(styles.root, className);

  const setTextOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const saveText = () => {
    if (editText?.key) {
      updateText(editText.key, {
        text: text,
        edit: true,
      });
    } else {
      if (text) {
        addText({ text: text });
      }
    }
    setShowSelector(false);
    setShowMover(true);
  };

  return (
    <>
      <FormInput placeholder='Enter text' value={text} onChange={setTextOnChange} />
      <Button onClick={saveText}>Add text</Button>
    </>
  );
};

export default NavTextSelect;
