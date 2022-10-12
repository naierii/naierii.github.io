import { CustomProductPartFragment } from '@graphql/generated/graphql';
import cn from 'classnames';
import { Suspense } from 'react';
import MaterialGroup from '../MaterialGroup';

import styles from './NavPart.module.scss';

export interface NavPartProps {
  className?: string;
  part: CustomProductPartFragment;
}

const NavPart = ({ className, part }: NavPartProps) => {
  const rootClassName = cn(styles.root, className);

  if (!part?.materialGroup?.data) {
    return null;
  }

  return (
    <div className={rootClassName}>
      <Suspense fallback={<div>Loading...</div>}>
        <MaterialGroup materialGroup={part.materialGroup.data} part={part} />
      </Suspense>
    </div>
  );
};

export default NavPart;
