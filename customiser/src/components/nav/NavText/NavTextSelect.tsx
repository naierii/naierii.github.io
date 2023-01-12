import FormInput from '@components/ui/FormInput';
import FormSelect from '@components/ui/FormSelect';
import { TextCustomiser, useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { ChangeEvent, useEffect, useState } from 'react';

import styles from './NavText.module.scss';

export interface NavTextSelectProps {
  className?: string;
  editText?: TextCustomiser;
}

const fonts = [
  {
    name: 'Arial',
    url: 'https://boxxer-api-dev.nyc3.cdn.digitaloceanspaces.com/fonts/arial-bold-webfont.woff',
  },
  {
    name: 'Oswald',
    url: 'https://boxxer-api-dev.nyc3.cdn.digitaloceanspaces.com/fonts/oswald-semibold.woff',
  },
  {
    name: 'College',
    url: 'https://boxxer-api-dev.nyc3.cdn.digitaloceanspaces.com/fonts/college_block-webfont.woff',
  },
  {
    name: 'Ballantines',
    url: 'https://boxxer-api-dev.nyc3.cdn.digitaloceanspaces.com/fonts/ballantines-bold-webfont.woff',
  },
];

const NavTextSelect = ({ className, editText }: NavTextSelectProps) => {
  const [text, setText] = useState<string | undefined>(editText?.text);
  const [font, setFont] = useState<string | undefined>(editText?.font);
  const { addText, updateText } = useCustomiserStore((state) => state);
  const rootClassName = cn(styles.root, className);

  useEffect(() => {
    if (editText?.key) {
      updateText(editText.key, {
        text,
        font,
        edit: true,
      });
    } else {
      if (text) {
        addText({ text, font });
      }
    }
  }, [text, font]);

  const setTextOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onFontChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFont(e.target.value);
  };

  return (
    <>
      <FormInput placeholder='Enter text' value={text} onChange={setTextOnChange} />
      <FormSelect value={font} onChange={onFontChange}>
        {fonts.map((f) => (
          <option key={f.url} value={f.url}>
            {f.name}
          </option>
        ))}
      </FormSelect>
    </>
  );
};

export default NavTextSelect;
