import { useEffect, useRef } from 'react';

function useEffectOnce(effect: () => boolean, deps?: any[]) {
  const ref = useRef<null | boolean>(null);

  useEffect(() => {
    if (!ref.current) {
      ref.current = effect();
    }
  }, [deps]);
}

export default useEffectOnce;
