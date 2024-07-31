import { Config, fetchData } from './axiosConfig';
import { Product } from './models';
import { resources } from './resources';

export interface GetSortedProducts {
  searchQuery: string | null;
  priceRange: number[];
  categoryId: number | null;
  offset: number;
}

const getSortedProducts = async (props: GetSortedProducts): Promise<Product[]> => {
  const { searchQuery, priceRange, categoryId, offset } = props;
  const { products } = resources.filters;
  const url = `${products}/`;

  const price_min = priceRange[0];
  const price_max = priceRange[1];

  const params = {
    title: searchQuery,
    price_min,
    price_max,
    categoryId: categoryId,
    offset,
    limit: 20,
  };

  const config: Config = {
    method: 'GET',
    url,
    params,
  };

  try {
    const responseData = await fetchData<Product[]>(config);
    return responseData;
  } catch (error) {
    console.error('getSortedProducts Error', error);
    throw error;
  }
};

export default getSortedProducts;
