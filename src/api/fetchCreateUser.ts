import { Config, fetchData } from './axiosConfig';
import { DEFAULT_AVATAR_URL } from './constants';
import { resources } from './resources';

const fetchCreateUser = async (name: string, email: string, password: string) => {
  const { users } = resources.auth;
  const url = `${users}/`;
  const data = { name, email, password, avatar: DEFAULT_AVATAR_URL };

  const config: Config = {
    method: 'POST',
    url,
    data,
  };

  const response = await fetchData(config);
  return response;
};

export default fetchCreateUser;
