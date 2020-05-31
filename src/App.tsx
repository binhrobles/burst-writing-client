import React from 'react';
import {
  Button,
  Message,
  Grid,
  Image,
  Form,
  TextArea,
} from 'semantic-ui-react';

function App() {
  const [counter, setCounter] = React.useState(10);
  const [text, setText] = React.useState('');
  const [isCounting, setCounting] = React.useState(false);
  const [hasFinished, setFinished] = React.useState(false);

  React.useEffect(() => {
    if (isCounting && counter > 0) {
      const timer = setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    } else if (counter === 0) {
      setCounting(false);
      setFinished(true);
    }
  }, [counter, isCounting]);

  // auto-focus text area when starting timer
  const textInput = React.createRef<TextArea>();
  function start() {
    setCounting(true);
    const node = textInput.current;
    if (node) node.focus();
  }

  // TODO: useEffect hook to save to server

  return (
    <Grid>
      <Grid.Row columns="equal">
        <Grid.Column textAlign="center" verticalAlign="middle">
          <h1>
            {Math.floor(counter / 60)
              .toString()
              .padStart(1, '0')}
            :{(counter % 60).toString().padStart(2, '0')}
          </h1>
          <Grid.Row>
            <Button content="Start" primary onClick={start} />
          </Grid.Row>
        </Grid.Column>
        <Grid.Column>
          <Image
            src="https://lh3.googleusercontent.com/0IeKGH3eDPQroPCbTpz3xqTRQ0WLES-9-Bm23esHz_eUWeFWGfzbpFxseBoF2qTyedULbZM3b01BqZFiaMvY8cuMtHzBkE4tqvPz9fw6qDU=w1100-h1282-no"
            size="large"
            centered
            rounded
          />
        </Grid.Column>
        <Grid.Column>Vocab List: Will add Google translate box</Grid.Column>
      </Grid.Row>

      <Grid.Row centered>
        <Grid.Column width={10}>
          {hasFinished && (
            <Message
              onDismiss={() => setFinished(false)}
              header="Time's up!"
              content="Save your work and check your grammar"
            />
          )}

          <Form>
            <TextArea
              placeholder="Set the timer, and start typing!"
              ref={textInput}
              value={text}
              onChange={(e) => {
                if (isCounting)
                  setText((e.target as HTMLTextAreaElement).value);
              }}
            />
          </Form>
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
  );
}

export default App;
