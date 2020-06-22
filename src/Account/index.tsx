import React from 'react';
import { Button, Header, Container, Image, Icon } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';
import History from '../History/index';
import useStateWithSessionStorage from '../hooks/useStateWithSessionStorage';
import keys from '../keys';

interface JWTPayload {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
  jti: string;
}

export default function Account() {
  const [userAuth, updateUserAuth] = useStateWithSessionStorage('user_auth');
  const [userDecodedToken, updateUserToken] = React.useState<JWTPayload | null>(
    null,
  );
  const [
    authClient,
    setAuthClient,
  ] = React.useState<gapi.auth2.GoogleAuth | null>(null);

  const onLogin = (response: gapi.auth2.AuthResponse) => {
    updateUserAuth(JSON.stringify(response));
    updateUserToken(jwt_decode(response.id_token));
  };

  const onLogout = () => {
    updateUserAuth('');
    updateUserToken(null);
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

  if (!userDecodedToken) {
    return (
      <Button icon color="google plus" labelPosition="left" onClick={login}>
        <Icon name="google" />
        Login with Google
      </Button>
    );
  }

  return (
    <Container>
      <Header as="h2">
        <Image circular src={userDecodedToken.picture} />
        {userDecodedToken.given_name}
      </Header>

      <History user={userDecodedToken.sub} />

      <Button icon basic color="red" labelPosition="left" onClick={logout}>
        <Icon name="google" />
        Logout
      </Button>
    </Container>
  );
}
