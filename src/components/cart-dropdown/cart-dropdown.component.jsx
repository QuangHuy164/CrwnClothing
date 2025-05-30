import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const cartItems  = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = useCallback(() => {
    navigate('/checkout')
  }, [])

  return (
    <div className='cart-dropdown-container'>
        <div className='cart-items' >
          {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
        </div>
        <Button onclick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;


