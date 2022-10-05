import { CustomProduct, Maybe } from '@graphql/generated/graphql';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import NavItem from '../NavItem';
import NavOption from '../NavOption';
import NavPart from '../NavPart';

import styles from './CustomiserNav.module.scss';

export interface CustomiserNavProps {
  className?: string;
  data?: Maybe<CustomProduct>;
}

const CustomiserNav = ({ className, data }: CustomiserNavProps) => {
  const rootClassName = cn(styles.root, className);
  const selectedOption = useCustomiserStore((state) => state.selectedOption);
  const selectedPart = useCustomiserStore((state) => state.selectedPart);

  return (
    <div className={rootClassName}>
      <div className={styles.header}></div>
      <div className={styles.content}>
        {selectedOption ? (
          <NavOption option={selectedOption} />
        ) : selectedPart ? (
          <NavPart part={selectedPart} />
        ) : (
          <>
            {data?.options?.map((o) => (
              <NavItem key={o?.id} option={o} />
            ))}
            {data?.parts?.map((o) => (
              <NavItem key={o?.id} part={o} />
            ))}
          </>
        )}
      </div>
      <div className={styles.actions}></div>
    </div>
  );
};

export default CustomiserNav;
