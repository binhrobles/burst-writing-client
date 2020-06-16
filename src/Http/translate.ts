import axios from 'axios';
import keys from '../keys';

const instance = axios.create({
  baseURL: `${keys.baseURL}translate`,
});

function handleError(e: any) {
  console.error(JSON.stringify(e, null, 2));
}

// text -> target language code
async function translate(text: string, target: string) {
  try {
    const response = await instance.get(`?target=${target}&q=${text}`);
    return response.data.translation;
  } catch (e) {
    handleError(e);
    return null;
  }
}

const TranslateClient = {
  translate,
};

export default TranslateClient;
