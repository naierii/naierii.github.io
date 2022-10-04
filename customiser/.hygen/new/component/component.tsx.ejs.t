---
to: <%= absPath %>/<%= component_name %>.tsx
---
import cn from 'classnames';

import styles from './<%= component_name %>.module.scss';

export interface <%= component_name %>Props {
  className?: string;
}

const <%= component_name %> = ({ className }: <%= component_name %>Props) => {
  const rootClassName = cn(styles.root, className);
  return <div className={rootClassName} />;
};

export default <%= component_name %>;
