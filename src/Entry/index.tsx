import React from 'react';
import PropTypes from 'prop-types';
import { Message, Form, TextArea } from 'semantic-ui-react';

function Entry(props: any) {
  const { hasFinished, textInputRef } = props;
  const [text, setText] = React.useState('');

  return (
    <>
      {hasFinished && (
        <Message
          header="Time's up!"
          content="Save your work and check your grammar"
        />
      )}
      <Form>
        <TextArea
          placeholder="Set the timer, and start typing!"
          ref={textInputRef}
          value={text}
          onChange={(e) => {
            if (!hasFinished) setText((e.target as HTMLTextAreaElement).value);
          }}
        />
      </Form>
    </>
  );
}

Entry.propTypes = {
  textInputRef: PropTypes.shape({
    current: PropTypes.instanceOf(TextArea),
  }).isRequired,
  hasFinished: PropTypes.bool.isRequired,
};

export default Entry;
