import React from 'react';
import { Container, Divider, Grid, Menu, Header } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Account from './Account/index';
import Writer from './Writer/index';

export default function App() {
  return (
    <Container style={{ marginTop: '3em' }}>
      <Header as="h2" dividing>
        Burst Writer
      </Header>
      <Router>
        <Grid columns={3} doubling relaxed>
          <Grid.Column>
            <Menu secondary>
              <Menu.Item as={Link} to="/">
                Account
              </Menu.Item>
              <Menu.Item as={Link} to="/writer">
                Writer
              </Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid>
        <Divider />

        <Switch>
          <Route path="/writer">
            <Writer />
          </Route>
          <Route path="/">
            <Account />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}
