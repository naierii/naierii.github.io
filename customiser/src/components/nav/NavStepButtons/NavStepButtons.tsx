import Button from '@components/ui/Button';
import { usePortalRef } from '@hooks';
import cn from 'classnames';
import ReactDOM from 'react-dom';

import styles from './NavStepButtons.module.scss';

export interface NavStepButtonsProps {
  className?: string;
  step?: number;
  maxStep: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onApply?: () => void;
}

const NavStepButtons = ({
  className,
  step,
  maxStep,
  onApply,
  onNext,
  onPrevious,
}: NavStepButtonsProps) => {
  const rootClassName = cn(styles.root, className);
  const portalRef = usePortalRef('CustomiserNavActions');

  if (!portalRef) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={rootClassName}>
      {step === 0 ? (
        <Button colour='darkGrey' onClick={onApply}>
          Cancel
        </Button>
      ) : (
        <Button onClick={onPrevious} disabled={step === 0}>
          Prev Step
        </Button>
      )}

      {/* <Button>View Model</Button> */}

      {step === maxStep ? (
        <Button colour='red' onClick={onApply}>
          Save
        </Button>
      ) : (
        <Button colour='yellow' onClick={onNext}>
          Next Step
        </Button>
      )}
    </div>,
    portalRef,
  );
};

export default NavStepButtons;
