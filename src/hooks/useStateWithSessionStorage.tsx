// https://github.com/the-road-to-learn-react/react-local-storage
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useStateWithSessionStorage = (
  sessionStorageKey: string,
): [string, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(
    sessionStorage.getItem(sessionStorageKey) || '',
  );

  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, value);
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return [value, setValue];
};

export default useStateWithSessionStorage;
