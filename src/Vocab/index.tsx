import React from 'react';
import { Button, Container, Form, Grid, TextArea } from 'semantic-ui-react';
import TranslateClient from '../Http/translate';

function Vocab() {
  const [neededWords, setNeededWords] = React.useState('');
  const [wordBank, setWordBank] = React.useState('');

  // translates text -> target language
  async function handleTranslate(translateText: string, target: string) {
    const response = await TranslateClient.translate(translateText, target);
    setWordBank(response);
  }

  return (
    <>
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
    </>
  );
}

export default Vocab;
