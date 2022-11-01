import { useEffect, useRef, useState } from 'react';

export const usePortalRef = (id: string) => {
  const [loaded, setLoaded] = useState(false);
  const portalRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!loaded) {
      portalRef.current = document.getElementById(id);
      if (portalRef.current) {
        setLoaded(true);
      }
    }
  }, [id, loaded]);

  return loaded ? portalRef.current : null;
};
