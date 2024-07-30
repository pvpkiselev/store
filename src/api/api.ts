import fetchAuthentication from './fetchAuthentication';
import fetchCreateUser from './fetchCreateUser';
import getUserSession from './getUserSession';

const api = {
  auth: {
    fetchAuthentication,
    fetchCreateUser,
    getUserSession,
  },
};

export default api;
