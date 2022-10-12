import cn from 'classnames';
import { SelectHTMLAttributes } from 'react';

import styles from './FormSelect.module.scss';

export interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

const FormSelect = ({ className, children, ...props }: FormSelectProps) => {
  const rootClassName = cn(styles.root, className);
  return (
    <div className={rootClassName}>
      <select className={styles.select} {...props}>
        {children}
      </select>
      <svg xmlns='http://www.w3.org/2000/svg' className={styles.icon} viewBox='0 0 18.108 30.546'>
        <path d='m2.835 30.545-2.836-2.836 12.387-12.436L0 2.835 2.836-.001l15.272 15.274Z' />
      </svg>
    </div>
  );
};

export default FormSelect;
