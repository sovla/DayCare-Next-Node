import { useEffect, useState } from 'react';

export default function useScript(src: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = src;
    script.async = true;

    const handleLoad = () => setLoading(false);
    const handleError = (_error: any) => setError(_error);

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };
  }, [src]);

  return [loading, error];
}
