import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component/';

import './checkout.styles.scss'

const Checkout = () => {
  const { cartItems, addItemToCart } = useContext(CartContext);

    return (
        <div>
          <h1>I am the checkout page</h1>
          <div>
            {
                cartItems.map((cartItem) => {
                    const { id, name, quantity } = cartItem;
                    return ( 
                     <div key={id}>
                      <h2>{name}</h2>
                      <span>{quantity}</span>  
                      <br />
                      <span>decrement</span>
                      <br />
                      <span onClick={() => addItemToCart(cartItem)}>increment</span>
                    </div>
                    );
                })}
          </div>
            {cartItems.map((cartItem) => (
                     <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                ))}
                <span className='total'>Total: 0</span>
          </div>
    );
};

export default Checkout;