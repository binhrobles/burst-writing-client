import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Message, Form, TextArea } from 'semantic-ui-react';

declare global {
  interface Window {
    tinyMCE: any;
  }
}

function Entry(props: any) {
  const { hasFinished, textInputRef } = props;
  const [text, setText] = React.useState('');

  function checkText() {
    window.tinyMCE.activeEditor.execCommand('mceWritingImprovementTool', 'es');
    return false;
  }

  return (
    <>
      {hasFinished && (
        <Message
          header="Time's up!"
          content="Save your work and check your grammar"
        />
      )}
      <Form name="checkform">
        <Segment>
          <Form.TextArea
            id="checktext"
            name="text"
            placeholder="Set the timer, and start typing!"
            ref={textInputRef}
            style={{ padding: 0 }}
            value={text}
            onChange={(e) => {
              if (!hasFinished)
                setText((e.target as HTMLTextAreaElement).value);
            }}
          />
        </Segment>

        <Form.Input
          type="submit"
          name="_action_checkText"
          value="Check Text"
          onClick={checkText}
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
