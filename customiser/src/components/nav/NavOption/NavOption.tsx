import { ComponentCustomiserCustomOption, Maybe } from '@graphql/generated/graphql';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import NavBack from '../NavBack';

import styles from './NavOption.module.scss';

export interface NavOptionProps {
  className?: string;
  option: Maybe<ComponentCustomiserCustomOption>;
}

const NavOption = ({ className, option }: NavOptionProps) => {
  const rootClassName = cn(styles.root, className);
  const setSelectedModel = useCustomiserStore((state) => state.setSelectedModel);

  return (
    <div className={rootClassName}>
      <NavBack />
      {option?.models?.map((m) => (
        <button key={m?.id} onClick={() => setSelectedModel(option.id, m?.model?.data)}>
          {m?.model?.data?.attributes?.name}
        </button>
      ))}
    </div>
  );
};

export default NavOption;
