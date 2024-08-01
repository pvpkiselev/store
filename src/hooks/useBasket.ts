import { Product } from '@/api/models';
import { BASKET_STORAGE_NAME } from '@/helpers/constants';
import { selectBasketItems } from '@/store/basket/basketSelectors';
import { addToBasket, removeFromBasket, setBasket } from '@/store/basket/basketSlice';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { useCallback, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

function useBasket() {
  const dispatch = useAppDispatch();
  const basketItems = useAppSelector(selectBasketItems);

  const prevBasketItemsRef = useRef<Product[]>([]);

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(BASKET_STORAGE_NAME);
      if (storedItems) {
        const items = JSON.parse(storedItems);
        dispatch(setBasket(items));
        prevBasketItemsRef.current = items;
      }
    } catch (error) {
      console.error('Failed to load basket from localStorage:', error);
      toast.error('Failed to load basket from localStorage');
    }
  }, [dispatch]);

  const saveBasketToLocalStorage = useCallback((items: Product[]) => {
    try {
      localStorage.setItem(BASKET_STORAGE_NAME, JSON.stringify(items));
      prevBasketItemsRef.current = items;
    } catch (error) {
      console.error('Failed to save basket to localStorage:', error);
      toast.error('Failed to save basket to localStorage');
    }
  }, []);

  const handleAddToBasket = useCallback(
    (product: Product) => {
      try {
        dispatch(addToBasket(product));
        const updatedBasketItems = [...basketItems, product];
        saveBasketToLocalStorage(updatedBasketItems);
      } catch (error) {
        console.error('Failed to add product to basket:', error);
        toast.error('Failed to add product to basket');
        dispatch(setBasket(prevBasketItemsRef.current));
      }
    },
    [dispatch, basketItems, saveBasketToLocalStorage]
  );

  const handleRemoveFromBasket = useCallback(
    (productId: number) => {
      try {
        dispatch(removeFromBasket(productId));
        const updatedBasketItems = basketItems.filter((item) => item.id !== productId);
        saveBasketToLocalStorage(updatedBasketItems);
      } catch (error) {
        console.error('Failed to remove product from basket:', error);
        toast.error('Failed to remove product from basket');
        dispatch(setBasket(prevBasketItemsRef.current));
      }
    },
    [dispatch, basketItems, saveBasketToLocalStorage]
  );

  const isProductInBasket = useCallback(
    (productId: number) => {
      return basketItems.some((item) => item.id === productId);
    },
    [basketItems]
  );

  return { handleAddToBasket, handleRemoveFromBasket, isProductInBasket, basketItems };
}

export default useBasket;
