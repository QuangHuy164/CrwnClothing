import { createContext, useEffect, useState, useMemo } from "react";


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

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    //check if quantity is equal to 1, if it is remove the item from the cart
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
    }
    // return back cart items with matching cart item with reduced quantity
    return cartItems.map((cartItem) => 
    cartItem.id === cartItemToRemove.id
     ? {...cartItem, quantity: cartItem.quantity - 1 }
     : cartItem
   );
};

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
 
export const CartContext = createContext ({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemsFromCart: () => {},
    cartCount: 0,
});

export const CartProvider = ({children}) => {
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
    
    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    };
    const value = useMemo(() => { 
        return {
        isCartOpen,
        setIsCartOpen, 
        addItemToCart, 
        removeItemToCart,
        clearItemFromCart,
        cartItems, 
        cartCount, 
    };
}, [isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, cartItems, cartCount]);
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}