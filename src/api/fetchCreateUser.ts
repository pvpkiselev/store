import { Config, fetchData } from './axiosConfig';
import { DEFAULT_AVATAR_URL } from './constants';
import { resources } from './resources';

interface CreateUserResponse {
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: string;
  id: number;
}

const fetchCreateUser = async (
  name: string,
  email: string,
  password: string
): Promise<CreateUserResponse> => {
  const { users } = resources.auth;
  const url = `${users}/`;
  const data = { name, email, password, avatar: DEFAULT_AVATAR_URL };

  const config: Config = {
    method: 'POST',
    url,
    data,
  };

  return fetchData<CreateUserResponse>(config);
};

export default fetchCreateUser;
