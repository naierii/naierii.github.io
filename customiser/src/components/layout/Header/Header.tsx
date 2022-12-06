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

import { graphQLClient } from '@graphql/graphql-client';
import styles from './Header.module.scss';
import { useMutation } from '@tanstack/react-query';
import { addToCart } from '@lib/shopify';
import { useDesignStore } from '@store/design';

export interface HeaderProps {
  className?: string;
  cameraRef: MutableRefObject<Camera | null>;
  canvasRef: RefObject<HTMLCanvasElement>;
}

const getCustomDesignData = (state: CustomiserState, files: string[]): CustomDesignInput => ({
  customProduct: state.customProduct?.id,
  parts: state.savedParts.map((p) => ({
    name: p.part.name,
    areaSize: p.part.areaSize?.data?.id,
    material: p.material.id,
  })),
  images: files,
  sizing: {
    shopifyVariantId: state.sizing?.variation?.id,
    height: state.sizing?.height?.value?.toString(),
    heightUnit: state.sizing?.height?.unit,
    weight: state.sizing?.weight?.value,
    weightUnit: state.sizing?.weight?.unit,
  },
});

const Header = ({ className, cameraRef, canvasRef }: HeaderProps) => {
  const images = useRef<File[]>([]);
  const rootClassName = cn(styles.root, className);
  const total = useCustomiserStore((state) => state.total());
  const addingToCart = useDesignStore((state) => state.addingToCart);
  const modelRotation = useDesignStore((state) => state.modelRotation);
  const setAddingToCart = useDesignStore((state) => state.setAddingToCart);
  const setModelRotation = useDesignStore((state) => state.setModelRotation);
  const reset = useCustomiserStore((state) => state.reset);
  const state = useCustomiserStore((state) => state);

  const shopifyAddToCart = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      // window.location.href = window.Shopify.routes.root + 'cart';
      // reset();
    },
  });

  const { mutate } = useCreateCustomDesignMutation(graphQLClient, {
    onSuccess(data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const items: Array<{ id?: string; quantity: number; properties: any }> = [];

      if (data.createCustomDesign?.data?.attributes?.parts?.length) {
        data.createCustomDesign?.data?.attributes?.parts.forEach((p) => {
          const id = p?.shopifyVariantId?.replace('gid://shopify/ProductVariant/', '');
          const checkItem = items.find((i) => i.id === id);

          if (checkItem) {
            const newQuantity = checkItem.quantity + 1;
            checkItem.quantity = newQuantity;
            checkItem.properties._customDesignQuantity = newQuantity;
          } else {
            items.push({
              id: p?.shopifyVariantId?.replace('gid://shopify/ProductVariant/', ''),
              quantity: 1,
              properties: {
                _customDesignAddon: data.createCustomDesign?.data?.id,
                _customDesignQuantity: 1,
              },
            });
          }
        });
      }

      if (data.createCustomDesign?.data?.attributes?.sizing?.shopifyVariantId) {
        items.push({
          id: data.createCustomDesign?.data?.attributes?.sizing?.shopifyVariantId.replace(
            'gid://shopify/ProductVariant/',
            '',
          ),
          quantity: 1,
          properties: {
            _customDesign: data.createCustomDesign?.data?.id,
          },
        });
      }

      shopifyAddToCart.mutate({ items: items });
    },
  });

  const { mutateAsync } = useUploadMultipleFilesMutation(graphQLClient, {
    onSuccess(data) {
      const fileIDs = data.multipleUpload.map((f) => f?.data?.id) as string[];
      mutate({ data: getCustomDesignData(state, fileIDs) });
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

  const saveDesign = () => {
    saveImage();
  };

  return (
    <div className={rootClassName}>
      <div className={styles.total}>
        Current <span className={styles.price}>${total}</span>
      </div>
      <Button onClick={saveDesign}>Add to basket</Button>
    </div>
  );
};

export default Header;
