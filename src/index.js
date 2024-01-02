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
import { initializeApp } from "firebase/app";
import FormNoPremio from './pages/FormNoPremio';
import { Login } from './pages/Login';
import { SignInProvider } from './hooks/useContext/singInContext';
import MidelWearLogin from './midelwear/midelWearLogin';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6nH9SO7srB2LhSZaKebU1_aaDmD52ZNQ",
  authDomain: "mobilfront-e2dc3.firebaseapp.com",
  projectId: "mobilfront-e2dc3",
  storageBucket: "mobilfront-e2dc3.appspot.com",
  messagingSenderId: "481538460651",
  appId: "1:481538460651:web:cbda7c09bb612dd2b227ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const router = createBrowserRouter([
  {
    path: "/register/gracias",
    element: <Gracias/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register/:juego/:points",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <FormNoPremio/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Login/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/check",
    element: <MidelWearLogin/>,
    errorElement: <ErrorPage />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SignInProvider>
      <RouterProvider router={router} />
    </SignInProvider>
    
  </React.StrictMode>
);

