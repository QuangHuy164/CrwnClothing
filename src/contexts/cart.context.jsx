<<<<<<< HEAD
import { createContext, useEffect, useState, useMemo } from "react";

const addCartItem = (cartItems, productToAdd, ) => {
=======
import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
>>>>>>> 84fe5227b2cae332008cb5f51e8645f344630b9e

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if(existingCartItem) {
        return cartItems.map((cartItem) => 
         cartItem.id === productToAdd.id
          ? {...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
        );
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
<<<<<<< HEAD
    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    //check if quantity is equal to 1, if it is remove the item from the cart
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    // return back cart items with matching cart item with reduced quantity
    return cartItems.map((cartItem) => 
    cartItem.id === cartItemToRemove.id
     ? {...cartItem, quantity: cartItem.quantity - 1 }
     : cartItem
   );
=======
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
>>>>>>> 84fe5227b2cae332008cb5f51e8645f344630b9e
}
 
export const CartContext = createContext ({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    cartCount: 0,
});

<<<<<<< HEAD
export const CartProvider = ({ children }) => {
=======
export const CartProvider = ({children}) => {
>>>>>>> 84fe5227b2cae332008cb5f51e8645f344630b9e
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(addCartItem(cartItems, cartItemToRemove));
    };
<<<<<<< HEAD
    const value = useMemo(() => { 
        return {
        isCartOpen,
        setIsCartOpen, 
        addItemToCart, 
        removeItemToCart,
        cartItems, 
        cartCount, 
    };
}, [isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, cartItems, cartCount]);
=======
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

>>>>>>> 84fe5227b2cae332008cb5f51e8645f344630b9e
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}