import { ComponentCustomiserCustomParts } from '@graphql/generated/graphql';
import cn from 'classnames';
import { Maybe } from 'graphql/jsutils/Maybe';
import MaterialGroup from '../MaterialGroup';
import NavBack from '../NavBack';

import styles from './NavPart.module.scss';

export interface NavPartProps {
  className?: string;
  part: Maybe<ComponentCustomiserCustomParts>;
}

const NavPart = ({ className, part }: NavPartProps) => {
  const rootClassName = cn(styles.root, className);

  return (
    <div className={rootClassName}>
      <NavBack />
      <MaterialGroup materialGroup={part?.materialGroup?.data} />
    </div>
  );
};

export default NavPart;
