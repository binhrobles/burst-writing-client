import React from 'react';
import { Container, Divider, Grid, Menu, Header } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Account from './Account/index';
import Writer from './Writer/index';
import useAuthClient from './hooks/useAuthClient';

export default function App() {
  const authClient = useAuthClient();

  return (
    <Container style={{ marginTop: '3em' }}>
      <Router>
        <Grid columns={3} doubling relaxed>
          <Grid.Column>
            <Header as="h2">Burst Writer</Header>
          </Grid.Column>
          <Grid.Column>
            <Menu secondary>
              <Menu.Item as={Link} to="/">
                Writer
              </Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid>
        <Divider />

        <Switch>
          <Route path="/account">
            {authClient ? <Account authClient={authClient} /> : <></>}
          </Route>
          <Route path="/">
            <Writer />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}
