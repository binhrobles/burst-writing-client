// allows us to save/interact with objects, but persist as a string
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useStateWithSessionStorage from './useStateWithSessionStorage';

function useGAuthResponseWithSessionStorage<T>(
  key: string,
): [T | null, Dispatch<SetStateAction<T | null>>] {
  const [stringified, setStringified] = useStateWithSessionStorage(key);
  const [value, setValue] = useState<T | null>(
    stringified !== '' ? JSON.parse(stringified) : null,
  );

  useEffect(() => {
    setStringified(value ? JSON.stringify(value) : '');
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return [value, setValue];
}

export default useGAuthResponseWithSessionStorage;
