import { MaterialEntity, Maybe } from '@graphql/generated/graphql';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import styles from './MaterialGroup.module.scss';

export interface MaterialProps {
  className?: string;
  material: Maybe<MaterialEntity>;
}

export const Material = ({ className, material }: MaterialProps) => {
  const rootClassName = cn(styles.material, className);
  const selectedPart = useCustomiserStore((state) => state.selectedPart);
  const setPart = useCustomiserStore((state) => state.setPart);

  const mapImage = material?.attributes?.images?.find((i) => i?.mapType === 'map');

  const onClick = () => {
    if (selectedPart && material) {
      setPart(selectedPart, material);
    }
  };

  return (
    <button className={rootClassName} onClick={onClick}>
      {mapImage && <img src={mapImage?.image?.data?.attributes?.formats['thumbnail'].url} />}
    </button>
  );
};
