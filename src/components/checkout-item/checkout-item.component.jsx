import { useContext } from 'react';

import { CartContext} from '../../contexts/cart.context';

import './checkout-item.style.scss';

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity,} = cartItem;

    const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(cartItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'> {name}</span>
            <span className='quantity'>
                <div className='arrow'>

            </div>
                {quantity}
                <div className='arrow'>

            </div>
                </span>
            
            
            <span className='price'> {price}</span>
            <button className='remove-button' onClick={clearItemHandler}>
                &#10005;
                </button>
        </div>
        
    )
}