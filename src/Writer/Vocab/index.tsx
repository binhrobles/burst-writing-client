import React from 'react';
import { Button, Form, Segment, Header } from 'semantic-ui-react';
import TranslationRequest from './translationRequest';

function Vocab() {
  const [wordBank, setWordBank] = React.useState(['']);

  function growWordBank() {
    setWordBank((prev) => prev.concat(''));
  }

  function getUpdateFunctionForWordAt(idx: number) {
    return (newWord: string) => {
      setWordBank((prev) => {
        const newBank = [...prev];
        newBank[idx] = newWord;
        return newBank;
      });
    };
  }

  return (
    <Segment>
      <Header as="h3">What words do you need?</Header>
      <Form widths="equal">
        {wordBank.map((word, idx) => (
          <TranslationRequest
            word={word}
            setWord={getUpdateFunctionForWordAt(idx)}
            key={idx}
          />
        ))}
      </Form>
      <Button
        attached="bottom"
        content="I need another"
        onClick={growWordBank}
      />
    </Segment>
  );
}

export default Vocab;
