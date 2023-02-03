import { GraphicFragment } from '@graphql/generated/graphql';
import { GraphicCustomiser, useCustomiserStore } from '@store/customiser';
import { useState } from 'react';
import Image from '@components/ui/Image';

import styles from './NavImages.module.scss';
import { NavImagesUpload } from './NavImagesUpload';
import Button from '@components/ui/Button';

export interface NavImagesSelectProps {
  editGraphic?: GraphicCustomiser;
  graphic?: GraphicFragment;
}

export const NavImagesSelect = ({ editGraphic, graphic }: NavImagesSelectProps) => {
  const [currentGraphic, setCurrentGraphic] = useState<GraphicFragment | undefined>(graphic);
  const { addGraphic, updateGraphic } = useCustomiserStore((state) => state);

  const graphicSelected = (graphic: GraphicFragment) => {
    if (editGraphic?.key) {
      updateGraphic(editGraphic.key, {
        graphic,
        edit: true,
      });
    } else {
      addGraphic({
        graphic,
      });
    }
  };

  const setGraphic = (graphic: GraphicFragment) => {
    setCurrentGraphic(graphic);
    graphicSelected(graphic);
  };

  return (
    <div className={styles.graphics}>
      {currentGraphic ? (
        <>
          <Image className={styles.image} image={currentGraphic.attributes?.image?.data} />
          <Button onClick={() => setCurrentGraphic(undefined)}>Change Image</Button>
        </>
      ) : (
        <NavImagesUpload setGraphic={setGraphic} />
      )}
    </div>
  );
};
