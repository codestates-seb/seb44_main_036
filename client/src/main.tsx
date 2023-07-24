import React from 'react';
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
import AuthRoute from './components/route/AuthRoute';
import PublicRoute from './components/route/PublicRoute';

interface RouterBase {
  path: string;
  element: React.ReactNode;
  withAuth: boolean;
  index?: boolean;
}

const routerData: RouterBase[] = [
  {
    index: true,
    path: '/category?/:categoryId?',
    element: <MainPage />,
    withAuth: false,
  },
  {
    path: '/project/:projectId',
    element: <ProjectPage />,
    withAuth: false,
  },
  {
    path: '/project/:projectId/payment',
    element: <PaymentPage />,
    withAuth: true,
  },
  {
    path: '/project/edit',
    element: <WritePage />,
    withAuth: true,
  },
  {
    path: '/project/add',
    element: <WritePage />,
    withAuth: true,
  },
  {
    path: '/mypage',
    element: <MyPage />,
    withAuth: true,
  },
  {
    path: '/users/signup',
    element: <SignUpPage />,
    withAuth: false,
  },
  {
    path: '/users/login',
    element: <LoginPage />,
    withAuth: false,
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: routerData.map((router) => {
      if (router.withAuth) {
        return {
          path: router.path,
          element: <AuthRoute>{router.element}</AuthRoute>,
        };
      } else {
        return {
          path: router.path,
          element: <PublicRoute>{router.element}</PublicRoute>,
        };
      }
    }),
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CookiesProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </CookiesProvider>
);
