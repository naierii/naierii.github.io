import { FC, useMemo } from 'react';
import ReactDOM from 'react-dom';

import { usePortalRef } from '@hooks';
import { useCustomiserStore } from '@store/customiser';
import cn from 'classnames';
import styles from './SelectedMaterialInfo.module.scss';

const SelectedMaterialInfo: FC = () => {
  const portalRef = usePortalRef('CustomiserNavMaterial');
  const { selectedPart, parts } = useCustomiserStore();

  console.log(
    selectedPart,
    parts.find((part) => part.part.id === selectedPart?.id),
  );

  const selectedMaterial = useMemo(
    () => parts.find((part) => part.part.id === selectedPart?.id)?.material,
    [selectedPart, parts],
  );

  console.log('render', portalRef, selectedMaterial);

  if (!portalRef) return null;

  if (!selectedMaterial) {
    return ReactDOM.createPortal(
      <div className={cn(styles.root, styles.root__noMaterial)}>No material selected.</div>,
      portalRef,
    );
  }

  return ReactDOM.createPortal(
    <div className={styles.root}>
      <div className={styles.materialName}>{selectedMaterial.attributes?.name}</div>
      {/* TODO: Add currency */}
      <div>${selectedMaterial.attributes?.price?.data?.attributes?.price}</div>
      <small>
        <i>TODO: Add currency</i>
      </small>
    </div>,
    portalRef,
  );
};

export default SelectedMaterialInfo;
