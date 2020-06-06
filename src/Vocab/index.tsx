import React from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import TranslationRequest from './translationRequest';

function Vocab() {
  return (
    <>
      <Header as="h3">What words do you need?</Header>
      <Form>
        <Form.Group widths="equal">
          <TranslationRequest />
        </Form.Group>
      </Form>
      <Button
        attached="bottom"
        content="I need another"
        onClick={() => console.log('add another')}
      />
    </>
  );
}

export default Vocab;
