import { Product } from '@/api/models';
import { BASKET_STORAGE_NAME } from '@/helpers/constants';
import { selectIsAuth } from '@/store/auth/authSelectors';
import { selectBasketItems } from '@/store/basket/basketSelectors';
import {
  addedToBasket,
  basketSet,
  checkedOutBasket,
  decreasedItemCount,
  increasedItemCount,
  removedFromBasket,
} from '@/store/basket/basketSlice';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

const basketErrors = {
  load: 'Failed to load basket from localStorage:',
  save: 'Failed to save basket to localStorage:',
  must_login: 'You must be logged in to use the basket',
};

function useBasket() {
  const dispatch = useAppDispatch();
  const basketItems = useAppSelector(selectBasketItems);
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    const loadBasketFromLocalStorage = () => {
      try {
        const storedItems = localStorage.getItem(BASKET_STORAGE_NAME);
        if (storedItems) {
          const items = JSON.parse(storedItems);
          dispatch(basketSet(items));
        }
      } catch (error) {
        console.error(basketErrors.load, error);
        toast.error(basketErrors.load);
      }
    };

    loadBasketFromLocalStorage();
  }, []);

  useEffect(() => {
    const saveBasketToLocalStorage = (items: Product[]) => {
      try {
        if (items.length === 0) {
          localStorage.removeItem(BASKET_STORAGE_NAME);
        } else {
          localStorage.setItem(BASKET_STORAGE_NAME, JSON.stringify(items));
        }
      } catch (error) {
        console.error(basketErrors.save, error);
        toast.error(basketErrors.save);
      }
    };

    saveBasketToLocalStorage(basketItems);
  }, [basketItems]);

  const addToBasket = (product: Product) => {
    if (!isAuth) {
      toast.error(basketErrors.must_login);
      return;
    }
    dispatch(addedToBasket(product));
  };

  const removeFromBasket = (productId: number) => {
    if (!isAuth) {
      toast.error(basketErrors.must_login);
      return;
    }
    dispatch(removedFromBasket(productId));
  };

  const increaseItemCount = (productId: number) => {
    if (!isAuth) {
      toast.error(basketErrors.must_login);
      return;
    }
    dispatch(increasedItemCount(productId));
  };

  const decreaseItemCount = (productId: number) => {
    if (!isAuth) {
      toast.error(basketErrors.must_login);
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

  const checkoutBasket = () => {
    if (!isAuth) {
      toast.error(basketErrors.must_login);
      return;
    }

    return new Promise<void>((resolve) => {
      dispatch(checkedOutBasket());
      resolve();
    });
  };

  return {
    addToBasket,
    removeFromBasket,
    isProductInBasket,
    increaseItemCount,
    decreaseItemCount,
    checkoutBasket,
    basketItems,
  };
}

export default useBasket;
