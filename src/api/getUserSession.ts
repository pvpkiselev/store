import { Config, fetchData } from './axiosConfig';
import { resources } from './resources';

interface UserSessionResponse {
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: string;
  id: number;
}

const getUserSession = async (): Promise<UserSessionResponse> => {
  const { auth, profile } = resources.auth;
  const url = `${auth}/${profile}`;

  const config: Config = {
    method: 'GET',
    url,
  };

  return fetchData<UserSessionResponse>(config);
};

export default getUserSession;
