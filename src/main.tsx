import React from 'react';
import ReactDOM from 'react-dom/client';
import { theme } from './theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import Home from './routes/Home';
import Auth from './routes/Auth';
import { Provider } from 'react-redux';
import { store } from './store/store';
import BasketPage from './routes/BasketPage';
import { basketPageLoader } from './loaders/basketPageLoader';
import { productPageLoader } from './loaders/productPageLoader';
import ProductPage from './routes/ProductPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'card/:cardId',
        element: <ProductPage />,
        loader: productPageLoader,
      },
      {
        path: '/basket',
        element: <BasketPage />,
        loader: basketPageLoader,
      },
      {
        path: '/auth',
        element: <Auth />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
