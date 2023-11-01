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
    className: styles.arial,
    url: 'https://boxxer-api-dev.nyc3.cdn.digitaloceanspaces.com/fonts/arial-bold-webfont.woff',
  },
  {
    name: 'Oswald',
    className: styles.oswald,
    url: 'https://boxxer-api-dev.nyc3.cdn.digitaloceanspaces.com/fonts/oswald-semibold.woff',
  },
  {
    name: 'College',
    className: styles.college,
    url: 'https://boxxer-api-dev.nyc3.cdn.digitaloceanspaces.com/fonts/college_block-webfont.woff',
  },
  {
    name: 'Ballantines',
    className: styles.ballantines,
    url: 'https://boxxer-api-dev.nyc3.cdn.digitaloceanspaces.com/fonts/ballantines-bold-webfont.woff',
  },
];

const NavTextSelect = ({ className, editText }: NavTextSelectProps) => {
  const [text, setText] = useState<string | undefined>(editText?.text);
  const [font, setFont] = useState<(typeof fonts)[number]>(
    fonts.find((f) => editText?.font === f.url) ?? fonts[0],
  );
  const { addText, updateText } = useCustomiserStore((state) => state);

  useEffect(() => {
    if (editText?.key) {
      updateText(editText.key, {
        text,
        font: font.url,
        edit: true,
      });
    } else {
      if (text) {
        addText({ text, font: font.url });
      }
    }
  }, [text, font]);

  const setTextOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onFontChange = (font: (typeof fonts)[number]) => {
    setFont(font);
  };

  return (
    <div className={className}>
      <FormInput placeholder='Enter text' value={text} onChange={setTextOnChange} />

      <div className={styles.fontSelection}>
        {fonts.map((_font) => (
          <div
            key={_font.name}
            onClick={() => onFontChange(_font)}
            className={cn(styles.font, _font.className, {
              [styles.selected]: font.name === _font.name,
            })}
          >
            {_font.name}
          </div>
        ))}
      </div>
      {/* <FormSelect
        className={fonts.find((f) => f.url === font)?.className}
        value={font}
        onChange={onFontChange}
      >
        {fonts.map((f) => (
          <option className={f.className} key={f.url} value={f.url}>
            {f.name}
          </option>
        ))}
      </FormSelect> */}
    </div>
  );
};

export default NavTextSelect;
