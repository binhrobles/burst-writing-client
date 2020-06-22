// functional component that smells like a GoogleAuth wrapper library
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import useJWTWithSessionStorage from './useJWTWithSessionStorage';
import keys from '../keys';

const useAuthClient = (): AuthClient => {
  const [authClient, setAuthClient] = useState<gapi.auth2.GoogleAuth | null>(
    null,
  );
  const [userDecodedToken, updateUserToken] = useJWTWithSessionStorage();

  const onLogin = (response: gapi.auth2.AuthResponse) => {
    updateUserToken(jwt_decode(response.id_token));
  };

  const onLogout = () => {
    updateUserToken(null);
  };

  // determines login status on auth client load
  useEffect(() => {
    if (authClient && authClient.isSignedIn.get()) {
      const user = authClient.currentUser.get();
      onLogin(user.getAuthResponse());
    }
  }, [authClient]);

  // loads Auth Client on page load
  useEffect(() => {
    let isMounted = true;
    window.gapi.load('auth2', () => {
      const client = window.gapi.auth2.getAuthInstance();
      if (client && isMounted) {
        setAuthClient(client);
      } else if (isMounted) {
        const authConfig = {
          clientId: keys.clientId,
          scope: 'email profile',
        };
        window.gapi.auth2.init(authConfig).then((res) => {
          if (isMounted) setAuthClient(res);
        });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async () => {
    if (authClient) {
      const user = await authClient.signIn();
      onLogin(user.getAuthResponse());
    }
  };

  const logout = async () => {
    if (authClient) {
      await authClient.signOut();
      onLogout();
    }
  };

  return {
    login,
    logout,
    userDecodedToken,
  };
};

export default useAuthClient;
