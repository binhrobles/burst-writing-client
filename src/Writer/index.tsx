import React from 'react';
import { Button, Container, Grid } from 'semantic-ui-react';
import Entry from '../Entry/index';
import Prompt from '../Prompt/index';
import Timer from './Timer/index';
import Vocab from './Vocab/index';

function Writer() {
  const [hasFinished, notifyFinished] = React.useState(false);

  // TODO: save wordBank, text to server

  return (
    <Container style={{ marginTop: '3em' }}>
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column textAlign="center" verticalAlign="middle">
            <Timer notifyFinished={notifyFinished} />
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
            <Entry hasFinished={hasFinished} />
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

export default Writer;
