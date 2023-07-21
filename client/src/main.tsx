import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import '@/index.css';
import Root from '@/Root.tsx';
import {
  MainPage,
  ProjectPage,
  LoginPage,
  MyPage,
  PaymentPage,
  SignUpPage,
  WritePage,
} from '@/pages';
import store from './store';
import { CookiesProvider } from 'react-cookie';
import { storage } from './common/utils/storage';

const isLogin = storage.get('accessToken');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        path: '/category?/:categoryId?',
        element: <MainPage />,
      },
      {
        path: '/project/:projectId',
        element: <ProjectPage />,
      },
      {
        path: '/project/:projectId/payment',
        element: isLogin ? <PaymentPage /> : <LoginPage />,
      },
      {
        path: '/project/edit',
        element: isLogin ? <WritePage /> : <LoginPage />,
      },
      {
        path: '/project/add',
        element: isLogin ? <WritePage /> : <LoginPage />,
      },
      {
        path: '/mypage',
        element: isLogin ? <MyPage /> : <LoginPage />,
      },
      {
        path: '/users/signup',
        element: <SignUpPage />,
      },
      {
        path: '/users/login',
        element: <LoginPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
