import { useCurrentGraphics } from '@context/CurrentGraphicsContext';
import { EDIT_MODE } from '@store/constants';
import { FlagCustomiser } from '@store/customiser';
import cn from 'classnames';
import { useEffect } from 'react';
import GraphicsCanvas from '../GraphicsCanvas';

import styles from './GraphicsWrapper.module.scss';

export interface GraphicsWrapperProps {
  className?: string;
  graphic: FlagCustomiser;
}

const GraphicsWrapper = ({ className, graphic: graphicCustomiser }: GraphicsWrapperProps) => {
  const rootClassName = cn(styles.root, className);
  const { graphic, setGraphic } = useCurrentGraphics();

  useEffect(() => {
    if (!graphic?.imageurl) {
      setGraphic({
        imageurl: graphicCustomiser.flag?.attributes?.image.data?.attributes?.url,
        canvas: undefined,
        freeze: false,
        material: null,
        editMode: EDIT_MODE.EDIT_2D,
      });
    }
  }, [graphic, graphicCustomiser]);

  if (!graphic?.imageurl) {
    return null;
  }

  return <GraphicsCanvas graphic={graphic} className={className} />;
};

export default GraphicsWrapper;
