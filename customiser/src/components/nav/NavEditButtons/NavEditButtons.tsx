import Button from '@components/ui/Button';
import { useCurrentGraphics } from '@context/CurrentGraphicsContext';
import { usePortalRef } from '@hooks';
import { EDIT_MODE } from '@store/constants';
import { FlagCustomiser, useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import ReactDOM from 'react-dom';

import styles from './NavEditButtons.module.scss';

export interface NavEditButtonsProps {
  className?: string;
  editFlag?: FlagCustomiser;
  setSelectModel: Dispatch<SetStateAction<boolean>>;
}

const NavEditButtons = ({ className, editFlag, setSelectModel }: NavEditButtonsProps) => {
  const rootClassName = cn(styles.root, className);
  const deselectFlag = useCustomiserStore((state) => state.deselectFlag);
  const { graphic, setGraphic } = useCurrentGraphics();
  const portalRef = usePortalRef('CustomiserNavActions');

  if (!portalRef) {
    return null;
  }

  const applyGraphic = () => {
    setGraphic({
      freeze: true,
      editMode: EDIT_MODE.EDIT_3D,
    });
    setSelectModel(false);
    deselectFlag();
  };

  return ReactDOM.createPortal(
    <div className={rootClassName}>
      <Button
        onClick={() =>
          setGraphic({
            freeze: false,
            editMode:
              graphic?.editMode === EDIT_MODE.EDIT_2D ? EDIT_MODE.EDIT_3D : EDIT_MODE.EDIT_2D,
          })
        }
        disabled={!editFlag}
      >
        {graphic?.editMode === EDIT_MODE.EDIT_2D ? 'Move Graphic' : 'Move Model'}
      </Button>
      <Button onClick={applyGraphic} disabled={!editFlag}>
        Apply to model
      </Button>
    </div>,
    portalRef,
  );
};

export default NavEditButtons;
