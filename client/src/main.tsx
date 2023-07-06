import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
        path: '/project/add',
        element: <WritePage />,
      },
      {
        path: '/project/edit',
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
