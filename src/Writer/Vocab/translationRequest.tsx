import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import TranslateClient from '../../Http/translate';

function TranslationRequest(props: any) {
  const { word, setWord } = props;
  const [translation, setTranslation] = React.useState('');

  // translates text -> target language
  // uses `isMounted` to keep track of whether the `word` has changed,
  // and thus the component has unmounted, since the translation response arrived
  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      const response = await TranslateClient.translate(word, 'es'); // TODO: grab lang from user settings
      if (isMounted) setTranslation(response);
    })();
    return () => {
      isMounted = false;
    };
  }, [word]);

  return (
    <Form.Group>
      <Form.Input
        fluid
        placeholder="?"
        value={word}
        onChange={(e) => setWord((e.target as HTMLInputElement).value)}
      />
      <Form.Input fluid readOnly value={translation} />
    </Form.Group>
  );
}

TranslationRequest.propTypes = {
  word: PropTypes.string.isRequired,
  setWord: PropTypes.func.isRequired,
};

export default TranslationRequest;
