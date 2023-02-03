import Image from '@components/ui/Image';
import { GraphicCustomiser, useCustomiserStore } from '@store/customiser';
import { Dispatch, SetStateAction } from 'react';
import NavOptionEdit from '../NavOptionEdit';
import styles from './NavImages.module.scss';

export interface NavImagesImageProps {
  graphic: GraphicCustomiser;
  setShowSelector: Dispatch<SetStateAction<boolean>>;
}

export const NavImagesImage = ({
  graphic,
  setShowSelector: setSelectModel,
}: NavImagesImageProps) => {
  const { updateGraphic, deleteGraphic } = useCustomiserStore((state) => state);

  const editItem = () => {
    if (graphic.key) {
      updateGraphic(graphic.key, { edit: true });
    }
    setSelectModel(true);
  };

  const deleteItem = () => {
    if (graphic.key) {
      deleteGraphic(graphic.key);
    }
  };

  return (
    <div className={styles.graphicItem}>
      <div className={styles.graphicItemImage}>
        <Image image={graphic.graphic?.attributes?.image?.data} />
      </div>
      <NavOptionEdit onEdit={editItem} onDelete={deleteItem} />
    </div>
  );
};
