import React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';
import History from '../History/index';

interface AccountProps {
  authClient: AuthClient;
}

export default function Account({ authClient }: AccountProps) {
  if (!authClient.userDecodedToken) {
    return <div>Log in!</div>;
  }

  return (
    <Container>
      <Header>Account Details</Header>
      <Segment clearing>
        <ul>
          <li>
            <b>First Language</b>: English
          </li>
          <li>
            <b>Target Language</b>: Spanish
          </li>
        </ul>
      </Segment>

      <Segment clearing>
        <Header as="h2">History</Header>
        <History user={authClient.userDecodedToken.sub} />
      </Segment>
    </Container>
  );
}
