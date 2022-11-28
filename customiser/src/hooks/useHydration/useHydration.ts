import { useCustomiserStore } from '@store/customiser';
import { useState, useEffect } from 'react';

export const useHydration = () => {
  const [hydrated, setHydrated] = useState(useCustomiserStore.persist.hasHydrated);

  useEffect(() => {
    const unsubHydrate = useCustomiserStore.persist.onHydrate(() => setHydrated(false)); // Note: this is just in case you want to take into account manual rehydrations. You can remove this if you don't need it/don't want it.
    const unsubFinishHydration = useCustomiserStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );

    setHydrated(useCustomiserStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};
