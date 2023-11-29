import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorPage from "./errorPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Gracias from './pages/Gracias';
const router = createBrowserRouter([
  {
    path: "/register/gracias",
    element: <Gracias/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register/:juego",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <RouterProvider router={router} />
  </React.StrictMode>
);

