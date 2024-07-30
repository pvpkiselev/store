import { Config, fetchData } from './axiosConfig';
import { resources } from './resources';

const fetchAuthentication = async (email: string, password: string) => {
  const { auth, login } = resources.auth;
  const url = `${auth}/${login}`;

  const data = {
    email,
    password,
  };

  const config: Config = {
    method: 'POST',
    url,
    data,
  };
  const response = await fetchData(config);
  return response;
};

export default fetchAuthentication;
