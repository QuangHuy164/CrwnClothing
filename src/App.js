import { useEffect, lazy, Suspense } from "react";
import {useDispatch} from 'react-redux'
import { Routes, Route } from 'react-router-dom';

import { 
    onAuthStateChangedListener, createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from './store/user/user.action'

const Navigation = lazy(() => import('./routes/navigation/navigation.component')) ; 
const Authentication = lazy(() => import('./routes/authentication/authentication.component'))
const Shop = lazy(() => import('./routes/shop/shop.component')) ;
const Checkout = lazy(() => import('./routes/checkout/checkout.component')) ;
const Home = lazy(()=> import('./routes/home/home.component'))

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
        const unSubcribe = onAuthStateChangedListener((user) => {
          if(user) {
              createUserDocumentFromAuth(user);
          }
          setCurrentUser(user);
        })
        return unSubcribe;
      }, []);
  return ( 
    <Suspense>
    <Routes>
      <Route path='/' element={<Navigation/>}>
      <Route index element={<Home />} />
      <Route path='shop' element={<Shop />} /> 
      <Route path='auth' element={<Authentication />} />
      <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
    </Suspense>
  );
};


export default App;
