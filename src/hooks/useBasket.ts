import { Product } from '@/api/models';
import { BASKET_STORAGE_NAME } from '@/helpers/constants';
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

  // const addToBasket = useCallback(
  //   (product: Product) => {
  //     const existingItem = basketItems.find((item) => item.id === product.id);
  //     if (existingItem) {
  //       dispatch(increasedItemCount(product.id));
  //     } else {
  //       dispatch(addedToBasket(product));
  //     }
  //   },
  //   [dispatch, basketItems]
  // );

  // const removeFromBasket = useCallback(
  //   (productId: number) => {
  //     const existingItem = basketItems.find((item) => item.id === productId);
  //     if (existingItem) {
  //       dispatch(decreasedItemCount(productId));
  //       if (existingItem.count <= 0) {
  //         dispatch(removedFromBasket(productId));
  //       }
  //     }
  //   },
  //   [dispatch, basketItems]
  // );
  const addToBasket = useCallback(
    (product: Product) => {
      dispatch(addedToBasket(product));
    },
    [dispatch, basketItems]
  );

  const removeFromBasket = useCallback(
    (productId: number) => {
      dispatch(removedFromBasket(productId));
    },
    [dispatch, basketItems]
  );

  const increaseItemCount = useCallback(
    (productId: number) => {
      dispatch(increasedItemCount(productId));
    },
    [dispatch, basketItems]
  );

  const decreaseItemCount = useCallback(
    (productId: number) => {
      dispatch(decreasedItemCount(productId));
    },
    [dispatch, basketItems]
  );

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
