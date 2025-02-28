import { createContext, useEffect, useState } from "react";


const addCartItem = (cartItems, productToAdd) => {

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

const removeCartItem = (cartItems, cartItemToRemove, ) => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    //check if quantity is equal to 1, if it is remove the item from the cart
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
}
 
const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext ({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const cartReducer = (state, action) => {
    const { type, payload} = action;

    switch(type) {
        case 'ADD_TO_CART':
           return {
            ...state,
            ...payload
           }
        default:
            throw new Error(`unhandled type of ${type} in cartReduce`)
    }
}

 
export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const updateCartItemsReducer = () => {

    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems)
    };

    const removeItemToCart = (cartItemToRemove) => {
       const newCartItems = removeCartItem(cartItems, cartItemToRemove);
       updateCartItemsReducer(newCartItems)
    };
    const clearItemFromCart = (cartItemToClear) => {
       const newCartItems = clearCartItem(cartItems, cartItemToClear);
       updateCartItemsReducer(newCartItems)
    };
    const value = { isCartOpen, setIsCartOpen, addItemToCart,removeItemToCart,clearItemFromCart, cartItems, cartCount,cartTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}