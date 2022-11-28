import Button from '@components/ui/Button';
import { GraphicsContextGraphic, useGraphics } from '@context/GraphicsContext';
import { usePortalRef } from '@hooks';
import { EDIT_MODE } from '@store/constants';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import ReactDOM from 'react-dom';

import styles from './NavEditButtons.module.scss';

export interface NavEditButtonsProps {
  className?: string;
  editFlag?: GraphicsContextGraphic;
  setShowSelector: Dispatch<SetStateAction<boolean>>;
}

const NavEditButtons = ({
  className,
  editFlag,
  setShowSelector: setSelectModel,
}: NavEditButtonsProps) => {
  const rootClassName = cn(styles.root, className);
  const { updateGraphic } = useGraphics();

  const portalRef = usePortalRef('CustomiserNavActions');

  if (!portalRef) {
    return null;
  }

  const applyGraphic = () => {
    if (editFlag?.key) {
      updateGraphic(editFlag.key, {
        freeze: true,
        editMode: EDIT_MODE.EDIT_3D,
        edit: false,
      });
    }

    setSelectModel(false);
  };

  return ReactDOM.createPortal(
    <div className={rootClassName}>
      {editFlag?.key && (
        <Button
          onClick={() =>
            updateGraphic(editFlag.key as string, {
              freeze: false,
              editMode:
                editFlag?.editMode === EDIT_MODE.EDIT_2D ? EDIT_MODE.EDIT_3D : EDIT_MODE.EDIT_2D,
              edit: true,
            })
          }
          disabled={!editFlag}
        >
          {editFlag?.editMode === EDIT_MODE.EDIT_2D ? 'Move Graphic' : 'Move Model'}
        </Button>
      )}

      <Button onClick={applyGraphic} disabled={!editFlag}>
        Apply to model
      </Button>
    </div>,
    portalRef,
  );
};

export default NavEditButtons;
