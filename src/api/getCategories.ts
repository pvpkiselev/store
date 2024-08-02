import { Config, fetchData } from './axiosConfig';
import { fetchErrors } from './constants';
import { Category } from './models';
import { resources } from './resources';

const getCategories = async (): Promise<Category[]> => {
  const { categories } = resources.filters;
  const url = `${categories}`;

  const config: Config = {
    method: 'GET',
    url,
  };

  try {
    const responseData = await fetchData<Category[]>(config);
    return responseData;
  } catch (error) {
    console.error(fetchErrors.categories, error);
    throw error;
  }
};

export default getCategories;
