import React from 'react';
import { Segment, Message, Form } from 'semantic-ui-react';

declare global {
  interface Window {
    tinyMCE: any;
  }
}

interface EntryProps {
  hasFinished: boolean;
}

const Entry = ({ hasFinished }: EntryProps) => {
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
};

Entry.displayName = 'Entry';

export default Entry;
