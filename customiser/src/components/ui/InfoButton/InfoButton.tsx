import { usePortalRef } from '@hooks';
import styles from './InfoButton.module.scss';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { Falsey } from 'lodash';

interface Props {
  title: string | Falsey;
}

const InfoButton = ({ title }: Props) => {
  const portalRef = usePortalRef('iInfoContainer');
  const [shouldShow, setShouldShow] = useState<boolean>(false);

  if (!portalRef) return null;

  return (
    <>
      <div className={styles.infoIcon} onClick={() => setShouldShow(true)}>
        i
      </div>
      {shouldShow &&
        createPortal(
          <>
            <div className={styles.iInfo}>
              <div className={styles.iInfo__bgOnclick} onClick={() => setShouldShow(false)} />
              <div className={styles.iInfo__display}>
                <div className={styles.iInfo__header}>
                  <span className={styles.iInfo__title}>{`${title} EXAMPLES` || 'EXAMPLES'}</span>
                  <span className={styles.iInfo__closebtn} onClick={() => setShouldShow(false)}>
                    x
                  </span>
                </div>
                <div className={styles.iInfo__body}>
                  <div className={styles.iInfo__styleName}>PRINTED</div>
                  <img
                    className={styles.iInfo__sampleImg}
                    src='https://res.cloudinary.com/dot-to-dot-design/w_868,f_auto,q_auto/boxxer_s3/content/1526119118469/names-printed.jpg'
                    alt=''
                  />
                  <div className={styles.iInfo__styleName}>EMBROIDERY</div>
                  <img
                    className={styles.iInfo__sampleImg}
                    src='https://res.cloudinary.com/dot-to-dot-design/w_868,f_auto,q_auto/boxxer_s3/content/1526119222257/names-flat-embroidery.png'
                    alt=''
                  />
                  <div className={styles.iInfo__styleName}>3D EMBROIDERY</div>
                  <img
                    className={styles.iInfo__sampleImg}
                    src='https://res.cloudinary.com/dot-to-dot-design/w_868,f_auto,q_auto/boxxer_s3/content/1526119313289/names-3d-embroidery.jpg'
                    alt=''
                  />
                  <img
                    className={styles.iInfo__sampleImg}
                    src='https://res.cloudinary.com/dot-to-dot-design/w_868,f_auto,q_auto/boxxer_s3/content/1526119344264/names-3d-embroidery-perspective.jpg'
                    alt=''
                  />
                  <div className={styles.iInfo__styleName}>3D CRYSTALS</div>
                  <img
                    className={styles.iInfo__sampleImg}
                    src='https://res.cloudinary.com/dot-to-dot-design/w_868,f_auto,q_auto/boxxer_s3/content/1526119433059/names-3d-crystals.jpg'
                    alt=''
                  />
                  <img
                    className={styles.iInfo__sampleImg}
                    src='https://res.cloudinary.com/dot-to-dot-design/w_868,f_auto,q_auto/boxxer_s3/content/1526727869947/names-3d-crystal-perspective.jpg'
                    alt=''
                  />
                  <div className={styles.iInfo__styleName}>GLITTER</div>
                  <img
                    className={styles.iInfo__sampleImg}
                    src='https://res.cloudinary.com/dot-to-dot-design/w_868,f_auto,q_auto/boxxer_s3/content/1526119258957/names-glitter.pg.jpg'
                    alt=''
                  />
                  <div className={styles.iInfo__styleName}>NAME PATCH</div>
                  <img
                    className={styles.iInfo__sampleImg}
                    src='https://res.cloudinary.com/dot-to-dot-design/w_868,f_auto,q_auto/boxxer_s3/content/1526119480153/name-patch-on-shorts.jpg'
                    alt=''
                  />
                </div>
              </div>
            </div>
          </>,
          portalRef,
        )}
    </>
  );
};

export default InfoButton;
