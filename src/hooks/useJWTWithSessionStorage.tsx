// allows us to save jwt as an object, but persist as a string
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useStateWithSessionStorage from './useStateWithSessionStorage';

const useJWTWithSessionStorage = (): [
  JWTPayload | null,
  Dispatch<SetStateAction<JWTPayload | null>>,
] => {
  const [stringified, setStringified] = useStateWithSessionStorage(
    'user_decoded_token',
  );
  const [token, setToken] = useState<JWTPayload | null>(
    stringified !== '' ? JSON.parse(stringified) : null,
  );

  useEffect(() => {
    setStringified(token ? JSON.stringify(token) : '');
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return [token, setToken];
};

export default useJWTWithSessionStorage;
