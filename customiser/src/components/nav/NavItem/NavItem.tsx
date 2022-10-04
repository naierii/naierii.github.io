import {
  ComponentCustomiserCustomOption,
  ComponentCustomiserCustomParts,
  Maybe,
} from '@graphql/generated/graphql';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';

import styles from './NavItem.module.scss';

export interface NavItemProps {
  className?: string;
  option?: Maybe<ComponentCustomiserCustomOption>;
  part?: Maybe<ComponentCustomiserCustomParts>;
}

const NavItem = ({ className, option, part }: NavItemProps) => {
  const setOption = useCustomiserStore((state) => state.setOption);
  const setSelectedPart = useCustomiserStore((state) => state.setSelectedPart);
  const rootClassName = cn(styles.root, className);

  const onClick = () => {
    if (option) {
      setOption(option);
    }
    if (part) {
      setSelectedPart(part);
    }
  };

  return (
    <button className={rootClassName} onClick={onClick}>
      {option?.name}
      {part?.name}
    </button>
  );
};

export default NavItem;
