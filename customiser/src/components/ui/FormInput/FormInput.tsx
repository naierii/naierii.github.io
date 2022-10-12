import cn from 'classnames';
import { InputHTMLAttributes } from 'react';

import styles from './FormInput.module.scss';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const FormInput = ({ className, placeholder, children, ...props }: FormInputProps) => {
  const rootClassName = cn(styles.root, className);
  return (
    <div className={rootClassName}>
      <input className={styles.input} {...props} placeholder=' ' />
      <label className={styles.label}>{placeholder}</label>
      {children}
    </div>
  );
};

export default FormInput;
