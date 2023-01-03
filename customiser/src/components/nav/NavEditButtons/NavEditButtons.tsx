import Button from '@components/ui/Button';
import { usePortalRef } from '@hooks';
import { FlagCustomiser, useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import ReactDOM from 'react-dom';

import styles from './NavEditButtons.module.scss';

export interface NavEditButtonsProps {
  className?: string;
  editFlag?: FlagCustomiser;
  setShowSelector: Dispatch<SetStateAction<boolean>>;
  setShowMover: Dispatch<SetStateAction<boolean>>;
}

const NavEditButtons = ({
  className,
  editFlag,
  setShowSelector: setSelectModel,
  setShowMover,
}: NavEditButtonsProps) => {
  const rootClassName = cn(styles.root, className);
  const updateFlag = useCustomiserStore((state) => state.updateFlag);

  const portalRef = usePortalRef('CustomiserNavActions');

  if (!portalRef) {
    return null;
  }

  const applyGraphic = () => {
    if (editFlag?.key) {
      updateFlag(editFlag.key, {
        decalFreeze: false,
        edit: false,
      });
    }

    setSelectModel(false);
    setShowMover(false);
  };

  return ReactDOM.createPortal(
    <div className={rootClassName}>
      <Button onClick={applyGraphic} disabled={!editFlag}>
        Apply to model
      </Button>
    </div>,
    portalRef,
  );
};

export default NavEditButtons;
