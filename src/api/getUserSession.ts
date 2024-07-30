import { Config, fetchData } from './axiosConfig';
import { resources } from './resources';

const getUserSession = async () => {
  const { auth, profile } = resources.auth;
  const url = `${auth}/${profile}`;

  const config: Config = {
    method: 'GET',
    url,
  };
  const response = await fetchData(config);
  return response;
};

export default getUserSession;
