import axios from 'axios';
import keys from '../keys';

function handleError(e: any) {
  console.error(JSON.stringify(e, null, 2));
}

const UserClient = (token: string) => {
  const instance = axios.create({
    baseURL: `${keys.baseURL}user/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

  // TODO: API to create user, update languages

  return {
    getEntries,
  };
};

export default UserClient;
