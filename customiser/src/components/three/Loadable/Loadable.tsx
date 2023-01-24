/* eslint-disable react/display-name */
import { FC, Suspense, forwardRef } from 'react';

export interface LoadableProps {
  className?: string;
}

// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
const Loadable = (Component: FC<any>) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forwardRef((props: any, ref) => (
    <Suspense fallback={<></>}>
      <Component {...props} ref={ref} />
    </Suspense>
  ));

export default Loadable;
