import React from 'react';
import { Form } from 'semantic-ui-react';
import TranslateClient from '../Http/translate';

function TranslationRequest() {
  const [request, setRequest] = React.useState('');
  const [translation, setTranslation] = React.useState('');

  // translates text -> target language
  // uses `isMounted` to keep track of whether the `request` has changed,
  // and thus the component has unmounted, since the translation response arrived
  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      const response = await TranslateClient.translate(request, 'es');
      if (isMounted) setTranslation(response);
    })();
    return () => {
      isMounted = false;
    };
  }, [request]);

  return (
    <>
      <Form.Input
        fluid
        placeholder="?"
        value={request}
        onChange={(e) => setRequest((e.target as HTMLInputElement).value)}
      />
      <Form.Input fluid readOnly value={translation} />
    </>
  );
}

export default TranslationRequest;
