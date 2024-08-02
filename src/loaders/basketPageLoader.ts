import { Product } from '@/api/models';
import { BASKET_STORAGE_NAME } from '@/helpers/constants';

export async function basketPageLoader() {
  try {
    const storedItems = localStorage.getItem(BASKET_STORAGE_NAME);
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems) as Product[];
      return parsedItems;
    }
    return [];
  } catch (error) {
    console.error('Failed to load basket items:', error);
    return [];
  }
}
