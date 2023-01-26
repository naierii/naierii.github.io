import Button from '@components/ui/Button';
import {
  CustomDesignEntity,
  CustomDesignInput,
  Maybe,
  useCreateCustomDesignMutation,
  useUploadMultipleFilesMutation,
} from '@graphql/generated/graphql';
import { CustomiserState, useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { MutableRefObject, RefObject, useCallback, useEffect, useRef } from 'react';
import { Camera } from 'three';

import { graphQLClient } from '@graphql/graphql-client';
import { addToCart } from '@lib/shopify';
import { useDesignStore } from '@store/design';
import { useMutation } from '@tanstack/react-query';
import styles from './Header.module.scss';

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
  texts: state.texts.map((t) => ({
    text: t.text,
    decalPosition: t.decalPosition,
    decalOrientation: t.decalOrientation,
    decalRotation: t.decalRotation,
    decalScale: t.decalScale,
    basePriceVariantId: t.basePrice?.shopifyVariantId,
    letterPriceVariantId: t.letterPrice?.shopifyVariantId,
    outlinePriceVariantId: t.outlinePrice?.shopifyVariantId,
    puffPriceVariantId: t.puffPrice?.shopifyVariantId,
    crystalPriceVariantId: t.crystalPrice?.shopifyVariantId,
  })),
  flags: state.flags.map((f) => ({
    flag: f.flag?.id,
    decalPosition: f.decalPosition,
    decalOrientation: f.decalOrientation,
    decalRotation: f.decalRotation,
    decalScale: f.decalScale,
    size: f.size,
    shopifyVariantId: f.basePrice?.shopifyVariantId,
  })),
  graphics: state.graphics.map((g) => ({
    graphic: g.graphic?.id,
    decalPosition: g.decalPosition,
    decalOrientation: g.decalOrientation,
    decalRotation: g.decalRotation,
    decalScale: g.decalScale,
    size: g.size,
    shopifyVariantId: g.basePrice?.shopifyVariantId,
  })),
  images: files,
  sizing: {
    shopifyVariantId: state.sizing?.variation?.id,
    size: state.sizing?.size,
    height: state.sizing?.height?.value?.toString(),
    heightUnit: state.sizing?.height?.unit,
    weight: state.sizing?.weight?.value,
    weightUnit: state.sizing?.weight?.unit,
  },
});

const getCartVariations = (customDesignEntity?: CustomDesignEntity) => {
  const customDesignId = customDesignEntity?.id;
  const customDesign = customDesignEntity?.attributes;

  if (!customDesign || !customDesignId) {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items: Array<{ id?: string; quantity: number; properties: any }> = [];
  const id = (id?: Maybe<string>) => id?.replace('gid://shopify/ProductVariant/', '');
  const getItem = (id?: string) => items.find((i) => i.id === id);
  const addOrUpdate = (variantId: string, addQty = 1) => {
    const checkItem = getItem(variantId);
    if (checkItem) {
      const newQuantity = checkItem.quantity + addQty;
      checkItem.quantity = newQuantity;
      checkItem.properties._customDesignQuantity = newQuantity;
    } else {
      items.push({
        id: variantId,
        quantity: addQty,
        properties: {
          _customDesignAddon: customDesignId,
          _customDesignQuantity: addQty,
        },
      });
    }
  };

  if (customDesign.parts?.length) {
    customDesign.parts.forEach((p) => {
      const variantId = id(p?.shopifyVariantId);
      if (variantId) addOrUpdate(variantId);
    });
  }

  if (customDesign.flags?.length) {
    customDesign.flags.forEach((p) => {
      const variantId = id(p?.shopifyVariantId);
      if (variantId) addOrUpdate(variantId);
    });
  }

  if (customDesign.graphics?.length) {
    customDesign.graphics.forEach((p) => {
      const variantId = id(p?.shopifyVariantId);
      if (variantId) addOrUpdate(variantId);
    });
  }

  if (customDesign.texts?.length) {
    customDesign.texts.forEach((t) => {
      const basePrice = id(t?.basePriceVariantId);
      if (basePrice) addOrUpdate(basePrice);
      const letterPrice = id(t?.letterPriceVariantId);
      if (letterPrice) addOrUpdate(letterPrice, t?.text?.length);
      const outlinePrice = id(t?.outlinePriceVariantId);
      if (outlinePrice) addOrUpdate(outlinePrice);
      const puffPrice = id(t?.puffPriceVariantId);
      if (puffPrice) addOrUpdate(puffPrice);
      const crystalPrice = id(t?.crystalPriceVariantId);
      if (crystalPrice) addOrUpdate(crystalPrice);
    });
  }

  if (customDesign.sizing?.shopifyVariantId) {
    items.push({
      id: id(customDesign.sizing.shopifyVariantId),
      quantity: 1,
      properties: {
        _customDesign: customDesignId,
      },
    });
  }

  return items;
};

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
      window.location.href = window.Shopify.routes.root + 'cart';
      reset();
    },
  });

  const { mutate } = useCreateCustomDesignMutation(graphQLClient, {
    onSuccess(data) {
      if (data.createCustomDesign?.data) {
        const items = getCartVariations(data.createCustomDesign.data);
        shopifyAddToCart.mutate({ items: items });
      }
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
