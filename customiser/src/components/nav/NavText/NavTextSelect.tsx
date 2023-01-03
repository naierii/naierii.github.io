import Button from '@components/ui/Button';
import FormInput from '@components/ui/FormInput';
import { TextCustomiser } from '@store/customiser';
import cn from 'classnames';
import { ChangeEvent, useState } from 'react';

import styles from './NavText.module.scss';

export interface NavTextSelectProps {
  className?: string;
  editText?: TextCustomiser;
}

const NavTextSelect = ({ className, editText }: NavTextSelectProps) => {
  const [text, setText] = useState<string>();
  const rootClassName = cn(styles.root, className);

  const setTextOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const addText = () => {
    console.log(text);
  };

  return (
    <>
      <FormInput placeholder='Enter text' value={text} onChange={setTextOnChange} />
      <Button onClick={addText}>Add text</Button>
    </>
  );
};

export default NavTextSelect;
