import axios from 'axios';
import keys from '../keys';

const instance = axios.create({
  baseURL: `${keys.baseURL}user/`,
});

function handleError(e: any) {
  console.error(JSON.stringify(e, null, 2));
}

async function getEntries(
  user: string,
): Promise<Array<Record<string, string | number>>> {
  try {
    const response = await instance.get(`${user}/entries`);
    return response.data;
  } catch (e) {
    handleError(e);
    return [];
  }
}

const UserClient = {
  getEntries,
};

export default UserClient;
