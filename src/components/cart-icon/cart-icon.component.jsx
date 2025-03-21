import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCartCount, selectIsCartOpen} from '../../store/cart/cart.selector'
import {setIsCartOpen} from '../../store/cart/cart.action'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = () => {
    // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const dispatch = useDispatch()
    const cartCount = useSelector(selectCartCount)
    const isCartOpen = useSelector(setIsCartOpen)

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen} > 
            <ShoppingIcon />
            <span className='item-count'>{cartCount}</span>
        </div>
    );
};

export default CartIcon;