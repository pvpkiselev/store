import { Config, fetchData } from './axiosConfig';
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
    console.error('getCategories Error', error);
    throw error;
  }
};

export default getCategories;
