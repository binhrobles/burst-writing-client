import React from 'react';
import { Button, Container, Header, Grid, TextArea } from 'semantic-ui-react';
import Entry from './Entry/index';
import Prompt from './Prompt/index';
import Timer from './Timer/index';
import Vocab from './Vocab/index';

function App() {
  const [hasFinished, notifyFinished] = React.useState(false);

  // auto-focus text area when starting timer
  const textInputRef = React.createRef<TextArea>();

  // TODO: save wordBank, text to server

  return (
    <Container style={{ marginTop: '3em' }}>
      <Header as="h2" dividing>
        Burst Writer
      </Header>
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column textAlign="center" verticalAlign="middle">
            <Timer
              textInputRef={textInputRef}
              notifyFinished={notifyFinished}
            />
          </Grid.Column>
          <Grid.Column>
            <Prompt />
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            <Vocab />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={10}>
            <Entry hasFinished={hasFinished} textInputRef={textInputRef} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered verticalAlign="bottom">
          <Grid.Column width={1}>
            <Button
              as="a"
              href="https://github.com/binhrobles-burst-writing"
              basic
              circular
              icon="github"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default App;
