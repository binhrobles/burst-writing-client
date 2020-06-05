import React from 'react';
import {
  Button,
  Container,
  Header,
  Message,
  Grid,
  Image,
  Form,
  TextArea,
} from 'semantic-ui-react';
import TranslateClient from './Http/translate';

function App() {
  const [counter, setCounter] = React.useState(60);
  const [text, setText] = React.useState('');
  const [neededWords, setNeededWords] = React.useState('');
  const [wordBank, setWordBank] = React.useState('');
  const [isCounting, setCounting] = React.useState(false);
  const [hasFinished, setFinished] = React.useState(false);

  // our timer guts: decrements counter every second
  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (isCounting && counter > 0) {
      const timer = setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }

    if (counter === 0) {
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

  // translates text -> target language
  async function handleTranslate(translateText: string, target: string) {
    const response = await TranslateClient.translate(translateText, target);
    setWordBank(response);
  }

  // TODO: save wordBank, text to server

  return (
    <Container style={{ marginTop: '3em' }}>
      <Header as="h2" dividing>
        Burst Writer
      </Header>
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column textAlign="center" verticalAlign="middle">
            <Header as="h1">
              {Math.floor(counter / 60)
                .toString()
                .padStart(1, '0')}
              :{(counter % 60).toString().padStart(2, '0')}
            </Header>
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
          <Grid.Column>
            <Grid>
              <Grid.Row columns="equal">
                <Grid.Column>
                  <Form>
                    <TextArea
                      placeholder="What words do you need?"
                      value={neededWords}
                      onChange={(e) =>
                        setNeededWords((e.target as HTMLTextAreaElement).value)
                      }
                    />
                  </Form>
                </Grid.Column>
                <Grid.Column>
                  <Container>{wordBank}</Container>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Button
              attached="bottom"
              content="Translate"
              onClick={() => handleTranslate(neededWords, 'es')} // TODO: language picker
            />
          </Grid.Column>
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
    </Container>
  );
}

export default App;
