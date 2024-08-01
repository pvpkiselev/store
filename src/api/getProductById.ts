import { Config, fetchData } from './axiosConfig';
import { Product } from './models';
import { resources } from './resources';

const getProductById = async (id: string): Promise<Product> => {
  const { products } = resources.filters;

  const url = `${products}/${id}`;

  const config: Config = {
    method: 'GET',
    url,
  };

  try {
    const responseData = await fetchData<Product>(config);
    return responseData;
  } catch (error) {
    console.error('Error: fetch get product', error);
    throw error;
  }
};

export default getProductById;
