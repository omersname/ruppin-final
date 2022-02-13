import {useEffect, useRef} from 'react';

export const useUpdate = (callback: () => void, deps: any[]) => {
  const mounted = useRef<boolean>(true);

  useEffect(() => {
    if (mounted.current) {
      mounted.current = false;
    } else {
      callback();
    }
  }, deps);
}
