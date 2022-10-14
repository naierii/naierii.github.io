import { ImageFragment, Maybe } from '@graphql/generated/graphql';
import cn from 'classnames';
import { CSSProperties, useMemo } from 'react';
import getSrcSets from './getSrcSets';

import styles from './Image.module.scss';

export interface ImageProps {
  className?: string;
  image?: Maybe<ImageFragment>;
  sizes?: string;
}

const Image = ({ className, image, sizes }: ImageProps) => {
  const rootClassName = cn(styles.root, className);

  if (!image) {
    return null;
  }

  const relativeHeight = useMemo(() => {
    if (image.attributes?.height && image.attributes?.width) {
      return (image.attributes.height / image.attributes.width) * 100;
    }
    return 100;
  }, [image]);

  const style = { '--image-padding-top': `${relativeHeight}%` } as CSSProperties;

  const srcSet = useMemo(() => getSrcSets(image.attributes?.formats), [image]);

  return (
    <div className={rootClassName} style={style}>
      {srcSet && (
        <img src={image.attributes?.url} srcSet={srcSet} sizes={sizes ? sizes : '100vw'} />
      )}
    </div>
  );
};

export default Image;
