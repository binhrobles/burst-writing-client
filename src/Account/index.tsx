import React from 'react';
import {
  Button,
  Header,
  Container,
  Image,
  Icon,
  Segment,
} from 'semantic-ui-react';
import History from '../History/index';

interface LoginProps {
  authClient: AuthClient;
}

export default function Account({ authClient }: LoginProps) {
  if (!authClient.userDecodedToken) {
    return (
      <Button
        icon
        color="google plus"
        labelPosition="left"
        onClick={() => authClient.login()}
      >
        <Icon name="google" />
        Login with Google
      </Button>
    );
  }

  return (
    <Container>
      <Segment clearing>
        <Header as="h2">
          <Image circular src={authClient.userDecodedToken.picture} />
          {authClient.userDecodedToken.given_name}
        </Header>
        <Button
          icon
          basic
          color="red"
          labelPosition="left"
          onClick={() => authClient.logout()}
        >
          <Icon name="google" />
          Logout
        </Button>
      </Segment>

      <Segment clearing>
        <Header as="h2">History</Header>
        <History user={authClient.userDecodedToken.sub} />
      </Segment>
    </Container>
  );
}
