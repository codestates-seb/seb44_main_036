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

const isLogin = () => {
  const a = storage.get('accessToken');
  console.log('로그인 했니?', a);
  return a;
};

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
        element: <PaymentPage />,
      },
      {
        path: '/project/edit',
        element: <WritePage />,
      },
      {
        path: '/project/add',
        element: <WritePage />,
      },
      {
        path: '/mypage',
        element: <MyPage />,
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
