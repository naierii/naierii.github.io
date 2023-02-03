import Button from '@components/ui/Button';
import { GraphicPriceEntity, useGetImagesQuery } from '@graphql/generated/graphql';
import { graphQLClient } from '@graphql/graphql-client';
import { useCustomiserStore } from '@store/customiser';
import { startTransition, useState } from 'react';
import NavButtons from '../NavButtons';
import NavDecalAdjust from '../NavDecalAdjust';
import NavEditButtons from '../NavEditButtons';

import styles from './NavImages.module.scss';
import { NavImagesImage } from './NavImagesImage';
import { NavImagesSelect } from './NavImagesSelect';

const NavImages = () => {
  const [showSelector, setShowSelector] = useState(false);
  const graphics = useCustomiserStore((state) => state.graphics);
  const updateGraphic = useCustomiserStore((state) => state.updateGraphic);
  const editGraphic = graphics?.find((g) => g.edit);

  const { data: imageQuery } = useGetImagesQuery(
    graphQLClient,
    {},
    {
      select: (data) => ({ prices: data.graphicPrices?.data }),
    },
  );

  const addImage = () => {
    setShowSelector(true);
  };

  const setScale = (event: number, price?: GraphicPriceEntity) => {
    const priceValues =
      price?.attributes?.size && price?.attributes?.basePrice
        ? {
            size: price.attributes.size,
            basePrice: {
              ...price.attributes.basePrice,
              quantity: 1,
            },
          }
        : {};

    if (editGraphic?.key) {
      updateGraphic(editGraphic.key, { decalScale: Number(event), ...priceValues });
    }
  };

  const setRotation = (event: number) => {
    startTransition(() => {
      if (editGraphic?.key) updateGraphic(editGraphic.key, { decalRotation: Number(event) });
    });
  };

  const applyImage = () => {
    if (editGraphic?.key) {
      updateGraphic(editGraphic.key, {
        decalFreeze: false,
        edit: false,
      });
    }

    setShowSelector(false);
  };

  return (
    <>
      {showSelector ? (
        <>
          <NavDecalAdjust
            scale={editGraphic?.decalScale}
            rotation={editGraphic?.decalRotation}
            onScale={setScale}
            onRotate={setRotation}
            prices={imageQuery?.prices}
          />
          <NavImagesSelect editGraphic={editGraphic} graphic={editGraphic?.graphic} />
          <NavEditButtons disabled={!editGraphic} onApply={applyImage} />
        </>
      ) : (
        <>
          <div className={styles.customiserFlags}>
            <h3>Your Images</h3>
            {graphics?.map((graphic) => (
              <NavImagesImage
                key={graphic.key}
                graphic={graphic}
                setShowSelector={setShowSelector}
              />
            ))}
            <Button colour='red' onClick={addImage}>
              Add Image
            </Button>
          </div>
          <NavButtons />
        </>
      )}
    </>
  );
};

export default NavImages;
