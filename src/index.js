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

