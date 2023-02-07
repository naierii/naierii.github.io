import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import cn from 'classnames';
import { CSSProperties, lazy, useCallback, useEffect, useRef } from 'react';

import {
  CustomDesignEntity,
  CustomDesignInput,
  Maybe,
  useCreateCustomDesignMutation,
  useUploadMultipleFilesMutation,
} from '@graphql/generated/graphql';
import { graphQLClient } from '@graphql/graphql-client';
import { addToCart } from '@lib/shopify';
import { CustomiserState, useCustomiserStore } from '@store/customiser';
import { useDesignStore } from '@store/design';
import { useMutation } from '@tanstack/react-query';
import { Camera, Euler, Group, Mesh, Vector3 } from 'three';
import Loadable from '../Loadable';
import MouseHelper from '../MouseHelper';
import styles from './CustomiserCanvas.module.scss';

const Scene = Loadable(lazy(() => import('@components/three/Scene')));

export interface CustomiserCanvasProps {
  className?: string;
  style?: CSSProperties;
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

const cameraDefault: [x: number, y: number, z: number] = [
  0, 2.1970893240496195e-15, 15.31024512625285,
];

const CustomiserCanvas = ({ className, style }: CustomiserCanvasProps): JSX.Element => {
  const cameraRef = useRef<Camera | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<File[]>([]);
  const positionRef = useRef<Vector3>(new Vector3());
  const orientationRef = useRef<Euler>(new Euler());
  const groupRef = useRef<Group>(null);
  const editFlag = useCustomiserStore((state) => state.flags.find((f) => f.edit));
  const editText = useCustomiserStore((state) => state.texts.find((f) => f.edit));
  const editGraphic = useCustomiserStore((state) => state.graphics.find((f) => f.edit));
  const updateGraphic = useCustomiserStore((state) => state.updateGraphic);
  const updateFlag = useCustomiserStore((state) => state.updateFlag);
  const updateText = useCustomiserStore((state) => state.updateText);
  const setCanvasSize = useCustomiserStore((state) => state.setCanvasSize);
  const resetCamera = useDesignStore((state) => state.resetCamera);
  const addingToCart = useDesignStore((state) => state.addingToCart);
  const modelRotation = useDesignStore((state) => state.modelRotation);
  const setAddingToCart = useDesignStore((state) => state.setAddingToCart);
  const setModelRotation = useDesignStore((state) => state.setModelRotation);
  const reset = useCustomiserStore((state) => state.reset);
  const rootClassName = cn(styles.root, className);
  const mouseHelperRef = useRef<Mesh>(null);
  const state = useCustomiserStore((state) => state);

  const setPosition = useCallback(
    (event: ThreeEvent<globalThis.PointerEvent>) => {
      const p = event.point;
      const n = event?.face?.normal.clone();
      if (mouseHelperRef.current && n && groupRef.current) {
        n.transformDirection(groupRef.current.matrixWorld);
        n.multiplyScalar(10);
        n.add(p);
        mouseHelperRef.current.position.copy(p);
        mouseHelperRef.current.lookAt(n);
      }
    },
    [mouseHelperRef],
  );

  const onPointerDown = useCallback(
    (event: ThreeEvent<globalThis.PointerEvent>) => {
      if (editFlag?.key) {
        updateFlag(editFlag.key, { decalFreeze: false });
        setPosition(event);
        if (mouseHelperRef.current && positionRef.current && orientationRef.current) {
          positionRef.current.copy(event.point);
          orientationRef.current.copy(mouseHelperRef.current.rotation);
          updateFlag(editFlag.key, {
            decalPosition: positionRef.current.clone().toArray(),
            decalOrientation: orientationRef.current.clone().toArray(),
          });
        }
      }

      if (editGraphic?.key) {
        updateGraphic(editGraphic.key, { decalFreeze: false });
        setPosition(event);
        if (mouseHelperRef.current && positionRef.current && orientationRef.current) {
          positionRef.current.copy(event.point);
          orientationRef.current.copy(mouseHelperRef.current.rotation);
          updateGraphic(editGraphic.key, {
            decalPosition: positionRef.current.clone().toArray(),
            decalOrientation: orientationRef.current.clone().toArray(),
          });
        }
      }

      if (editText?.key) {
        updateText(editText.key, { decalFreeze: false });
        setPosition(event);
        if (mouseHelperRef.current && positionRef.current && orientationRef.current) {
          positionRef.current.copy(event.point);
          orientationRef.current.copy(mouseHelperRef.current.rotation);
          updateText(editText.key, {
            decalPosition: positionRef.current.clone().toArray(),
            decalOrientation: orientationRef.current.clone().toArray(),
          });
        }
      }
    },
    [editFlag, editGraphic, editText],
  );

  const onPointerup = useCallback(() => {
    if (editFlag?.key) {
      updateFlag(editFlag.key, { decalFreeze: true });
    }

    if (editGraphic?.key) {
      updateFlag(editGraphic.key, { decalFreeze: true });
    }

    if (editText?.key) {
      updateText(editText.key, { decalFreeze: true });
    }
  }, [editFlag, editGraphic, editText]);

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

  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera) {
      return;
    }
    if (resetCamera) {
      camera.position.set(cameraDefault[0], cameraDefault[1], cameraDefault[2]);
      setAddingToCart();
    }
  }, [resetCamera]);

  const isEditing = editFlag || editGraphic || editText;

  return (
    <div className={rootClassName} style={style}>
      <Canvas
        linear
        flat
        camera={{
          position: cameraDefault,
          fov: 45,
        }}
        dpr={window.devicePixelRatio}
        gl={{ preserveDrawingBuffer: true }}
        ref={canvasRef}
        onCreated={(state) => {
          setCanvasSize(state.size.width, state.size.height);
          cameraRef.current = state.camera;
        }}
        frameloop='demand'
      >
        <Environment files='https://boxxer-api-dev.nyc3.cdn.digitaloceanspaces.com/assets/studio.hdr' />
        <Scene onPointerDown={onPointerDown} onPointerup={onPointerup} ref={groupRef} />
        {isEditing && <MouseHelper ref={mouseHelperRef} />}
        <OrbitControls
          enableZoom={true}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.9}
        />
      </Canvas>
    </div>
  );
};

export default CustomiserCanvas;
