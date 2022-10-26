import { useGetFlagsQuery } from '@graphql/generated/graphql';
import cn from 'classnames';
import Image from '@components/ui/Image';

import styles from './NavFlags.module.scss';

export interface NavFlagsProps {
  className?: string;
}

const NavFlags = ({ className }: NavFlagsProps) => {
  const rootClassName = cn(styles.root, className);

  const { data: flags } = useGetFlagsQuery(
    {
      pagination: { limit: 500 },
    },
    {
      select: (data) => data?.flags?.data,
    },
  );

  return (
    <div className={rootClassName}>
      {flags?.map((f) => (
        <div className={styles.flag} key={f.id}>
          <Image image={f.attributes?.image.data} />
        </div>
      ))}
    </div>
  );
};

export default NavFlags;
