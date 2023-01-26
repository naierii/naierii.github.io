import { MaterialFragment } from '@graphql/generated/graphql';
import cn from 'classnames';
import styles from './MaterialGroup.module.scss';

export interface MaterialProps {
  className?: string;
  material: MaterialFragment;
  onMaterialSelected: (material: MaterialFragment) => void;
}

export const Material = ({ className, material, onMaterialSelected }: MaterialProps) => {
  const rootClassName = cn(styles.material, className);

  const mapImage = material?.attributes?.images?.find((i) => i?.mapType === 'map');

  const onClick = () => {
    if (material) {
      onMaterialSelected(material);
    }
  };

  return (
    <button className={rootClassName} onClick={onClick} data-name={material.attributes?.name}>
      {mapImage && <img src={mapImage?.image?.data?.attributes?.formats['thumbnail'].url} />}
    </button>
  );
};
