import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import keys from '../keys';
import useStateWithSessionStorage from '../hooks/useStateWithSessionStorage';

export default function Account() {
  const [userAuth, updateUserAuth] = useStateWithSessionStorage('user_auth');
  const [
    authClient,
    setAuthClient,
  ] = React.useState<gapi.auth2.GoogleAuth | null>(null);

  const onLogin = (response: gapi.auth2.AuthResponse) => {
    updateUserAuth(JSON.stringify(response));
  };

  const onLogout = () => {
    updateUserAuth('');
  };

  // loads Auth Client on page load
  React.useEffect(() => {
    window.gapi.load('auth2', () => {
      let client = window.gapi.auth2.getAuthInstance();
      if (client) {
        setAuthClient(client);
      } else {
        const authConfig = {
          clientId: keys.clientId,
          scope: 'email profile',
        };
        window.gapi.auth2.init(authConfig).then((res) => {
          client = res;
          setAuthClient(client);
        });
      }
    });
  }, []);

  // determines login status on auth client load
  React.useEffect(() => {
    if (authClient && authClient.isSignedIn.get()) {
      const user = authClient.currentUser.get();
      onLogin(user.getAuthResponse());
    }
  }, [authClient]);

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

  if (!userAuth) {
    return (
      <Button icon color="google plus" labelPosition="left" onClick={login}>
        <Icon name="google" />
        Login with Google
      </Button>
    );
  }

  return (
    <Button icon basic color="red" labelPosition="left" onClick={logout}>
      <Icon name="google" />
      Logout
    </Button>
  );
}
