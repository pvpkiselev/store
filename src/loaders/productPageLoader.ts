import getProductById from '@/api/getProductById';
import { LoaderFunctionArgs } from 'react-router-dom';

export async function productPageLoader({ params }: LoaderFunctionArgs) {
  try {
    const responseData = await getProductById(params.cardId as string);
    const product = responseData;
    return product;
  } catch (error) {
    console.error('Failed to fetch product', error);
    return {};
  }
}
