import fetchAuthentication from './fetchAuthentication';
import fetchCreateUser from './fetchCreateUser';
import getCategories from './getCategories';
import getSortedProducts from './getSortedProducts';
import getUserSession from './getUserSession';

const api = {
  auth: {
    fetchAuthentication,
    fetchCreateUser,
    getUserSession,
  },
  filters: {
    getCategories,
    getSortedProducts,
  },
};

export default api;
