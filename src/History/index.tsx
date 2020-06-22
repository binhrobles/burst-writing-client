import React, { FunctionComponent } from 'react';
import { Container, Image, List } from 'semantic-ui-react';
import UserClient from '../Http/user';

interface HistoryProps {
  authClient: AuthClient;
}

const History: FunctionComponent<HistoryProps> = ({
  authClient,
}: HistoryProps) => {
  const { userDecodedToken, userAuthToken } = authClient;
  const [entries, updateEntries]: [
    Record<string, string | number>[],
    Function,
  ] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      if (userDecodedToken && userAuthToken) {
        const e = await UserClient(userAuthToken.id_token).getEntries(
          userDecodedToken.sub,
        );
        if (isMounted) updateEntries(e);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [userDecodedToken, userAuthToken]);

  const renderEntries = entries.map((e) => (
    <List.Item key={e.CreateTime}>
      <Image
        size="tiny"
        src="https://lh3.googleusercontent.com/0IeKGH3eDPQroPCbTpz3xqTRQ0WLES-9-Bm23esHz_eUWeFWGfzbpFxseBoF2qTyedULbZM3b01BqZFiaMvY8cuMtHzBkE4tqvPz9fw6qDU=w1100-h1282-no"
      />
      <List.Content>
        <List.Header as="a">Written 6/14 at 3:23pm</List.Header>
        <List.Description>
          Translations Needed:
          {e.WordBank}
        </List.Description>
      </List.Content>
    </List.Item>
  ));

  return (
    <Container>
      <List>{renderEntries}</List>
    </Container>
  );
};

export default History;
