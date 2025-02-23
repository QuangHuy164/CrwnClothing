import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './App';
import { UserProvider } from './contexts/user.context';
import { CategoriesProvider } from './contexts/products.context';
import { CartProvider } from './contexts/cart.context';

import './index.scss';

import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider> 
      <CategoriesProvider>
        <CartProvider>
         <App />
       </CartProvider>
      </CategoriesProvider>
     
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
