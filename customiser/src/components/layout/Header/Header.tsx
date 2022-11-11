import Button from '@components/ui/Button';
import {
  CustomDesignInput,
  useCreateCustomDesignMutation,
  useUploadMultipleFilesMutation,
} from '@graphql/generated/graphql';
import { CustomiserState, useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { MutableRefObject, RefObject, useCallback, useEffect, useRef } from 'react';
import { Camera } from 'three';
import { Buffer } from 'buffer';

import styles from './Header.module.scss';

export interface HeaderProps {
  className?: string;
  cameraRef: MutableRefObject<Camera | null>;
  canvasRef: RefObject<HTMLCanvasElement>;
}

const getCustomDesignData = (state: CustomiserState): CustomDesignInput => ({
  customProduct: state.customProduct?.id,
  parts: state.savedParts.map((p) => ({
    name: p.part.name,
    areaSize: p.part.areaSize?.data?.id,
    material: p.material.id,
  })),
});

const Header = ({ className, cameraRef, canvasRef }: HeaderProps) => {
  const images = useRef<File[]>([]);
  const rootClassName = cn(styles.root, className);
  const total = useCustomiserStore((state) => state.total());
  const addingToCart = useCustomiserStore((state) => state.addingToCart);
  const modelRotation = useCustomiserStore((state) => state.modelRotation);
  const setAddingToCart = useCustomiserStore((state) => state.setAddingToCart);
  const setModelRotation = useCustomiserStore((state) => state.setModelRotation);
  const state = useCustomiserStore((state) => state);

  const { mutate } = useCreateCustomDesignMutation({
    onSuccess(data) {
      console.log(data.createCustomDesign?.data?.attributes?.parts);
    },
  });

  const { mutateAsync } = useUploadMultipleFilesMutation({
    onSuccess(data) {
      console.log(data.multipleUpload);
    },
  });

  useEffect(() => {
    if (addingToCart && modelRotation < 360) {
      setTimeout(() => {
        canvasRef?.current?.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'fileName.png', { type: 'image/png' });
            images.current.push(file);
            setModelRotation(modelRotation + 90);
          }
        }, 'image/png');
      }, 50);
    } else if (addingToCart) {
      const upload = async () => {
        console.log(images.current);
        await mutateAsync({ files: images.current });
      };

      upload();
    }
  }, [modelRotation, addingToCart, images]);

  const saveImage = useCallback(() => {
    const camera = cameraRef.current;
    if (!camera) {
      return;
    }

    camera.position.set(0, 2.1970893240496195e-15, 25.31024512625285);
    setAddingToCart();
  }, []);

  const addToCart = () => {
    // mutate({ data: getCustomDesignData(state) });
    saveImage();
  };

  return (
    <div className={rootClassName}>
      <div className={styles.total}>
        Current <span className={styles.price}>${total}</span>
      </div>
      <Button onClick={addToCart}>Add to basket</Button>
    </div>
  );
};

export default Header;
