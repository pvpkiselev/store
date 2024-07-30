import { Config, fetchData } from './axiosConfig';
import { UserResponse } from './models';
import { resources } from './resources';

const getUserSession = async (token: string): Promise<UserResponse> => {
  const { auth, profile } = resources.auth;
  const url = `${auth}/${profile}`;

  const config: Config = {
    method: 'GET',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const responseData = await fetchData<UserResponse>(config);
    return responseData;
  } catch (error) {
    console.error('getUserSession Error', error);
    throw error;
  }
};

export default getUserSession;
