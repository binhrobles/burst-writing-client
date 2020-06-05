import axios from 'axios';
import keys from '../keys';

// TODO: migrate away from API Key usage to a proxying lambda

const instance = axios.create({
  baseURL: 'https://translation.googleapis.com/language/translate/v2',
});

function handleError(e: any) {
  console.error(JSON.stringify(e, null, 2));
}

// text -> target language code
async function translate(text: string, target: string) {
  try {
    const response = await instance.get(
      `?target=${target}&key=${keys.TRANSLATE_API_KEY}&q=${text}`,
    );
    return response.data.data.translations[0].translatedText;
  } catch (e) {
    handleError(e);
    return null;
  }
}

const TranslateClient = {
  translate,
};

export default TranslateClient;
