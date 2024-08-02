import { Product } from '@/api/models';
import { BASKET_STORAGE_NAME } from '@/helpers/constants';
import { selectIsAuth } from '@/store/auth/authSelectors';
import { selectBasketItems } from '@/store/basket/basketSelectors';
import {
  addedToBasket,
  basketSet,
  decreasedItemCount,
  increasedItemCount,
  removedFromBasket,
} from '@/store/basket/basketSlice';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { useCallback, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

function useBasket() {
  const dispatch = useAppDispatch();
  const basketItems = useAppSelector(selectBasketItems);
  const isAuth = useAppSelector(selectIsAuth);

  //TODO: Диспатчить значения из useRef, если произошла ошибка
  const prevBasketItemsRef = useRef<Product[]>([]);

  useEffect(() => {
    const loadBasketFromLocalStorage = () => {
      try {
        const storedItems = localStorage.getItem(BASKET_STORAGE_NAME);
        if (storedItems) {
          const items = JSON.parse(storedItems);
          dispatch(basketSet(items));
          prevBasketItemsRef.current = items;
        }
      } catch (error) {
        console.error('Failed to load basket from localStorage:', error);
        toast.error('Failed to load basket from localStorage');
      }
    };

    loadBasketFromLocalStorage();
  }, [dispatch]);

  useEffect(() => {
    const saveBasketToLocalStorage = (items: Product[]) => {
      try {
        localStorage.setItem(BASKET_STORAGE_NAME, JSON.stringify(items));
        prevBasketItemsRef.current = items;
      } catch (error) {
        console.error('Failed to save basket to localStorage:', error);
        toast.error('Failed to save basket to localStorage');
      }
    };

    const isBasketEmpty = basketItems.length === 0;
    if (!isBasketEmpty) {
      saveBasketToLocalStorage(basketItems);
    }
  }, [basketItems]);

  const addToBasket = (product: Product) => {
    if (!isAuth) {
      toast.error('You must be logged in to add items to the basket');
      return;
    }
    dispatch(addedToBasket(product));
  };

  const removeFromBasket = (productId: number) => {
    if (!isAuth) {
      toast.error('You must be logged in to remove items from the basket');
      return;
    }
    dispatch(removedFromBasket(productId));
  };

  const increaseItemCount = (productId: number) => {
    if (!isAuth) {
      toast.error('You must be logged in to increase item count');
      return;
    }
    dispatch(increasedItemCount(productId));
  };

  const decreaseItemCount = (productId: number) => {
    if (!isAuth) {
      toast.error('You must be logged in to decrease item count');
      return;
    }
    dispatch(decreasedItemCount(productId));
  };

  const isProductInBasket = useCallback(
    (productId: number) => {
      return basketItems.some((item) => item.id === productId);
    },
    [basketItems]
  );

  return {
    addToBasket,
    removeFromBasket,
    isProductInBasket,
    increaseItemCount,
    decreaseItemCount,
    basketItems,
  };
}

export default useBasket;
