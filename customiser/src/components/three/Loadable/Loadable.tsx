import { FC, Suspense } from 'react';

export interface LoadableProps {
  className?: string;
}

// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
const Loadable = (Component: FC<any>) => (props: any) =>
  (
    <Suspense fallback={<></>}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
