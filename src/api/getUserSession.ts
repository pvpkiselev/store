import { Config, fetchData } from './axiosConfig';
import { CreateUserResponse } from './models';
import { resources } from './resources';

const getUserSession = async (token: string): Promise<CreateUserResponse> => {
  const { auth, profile } = resources.auth;
  const url = `${auth}/${profile}`;

  const config: Config = {
    method: 'GET',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetchData(config);
  return response;
};

export default getUserSession;
