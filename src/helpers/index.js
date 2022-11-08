import { useMemo } from 'react';

export const useGetVersion = () => {
  const currentPathName = window.location.pathname

  return useMemo(() => {
    if (currentPathName === '/version-b') {
      return 'B'
    }

    return 'A'
  }, [currentPathName]);
}
