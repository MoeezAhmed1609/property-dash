import { useEffect } from 'react';

function useRemoveLocalStorage(key) {
  useEffect(() => {
    localStorage.removeItem(key);
  }, [key]);
}

export default useRemoveLocalStorage;
