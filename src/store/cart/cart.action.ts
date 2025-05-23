import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/firebase/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from "../categories/category.types";


const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem):CartItem[] => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );
  
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  };
  
  const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem):CartItem[] => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
    );
  
    //check if quantity is equal to 1, if it is remove the item from the cart
    if (existingCartItem && existingCartItem.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
    // return back cart items witch matching cart item with reduced quantity
  
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  };

  const clearCartItem = (cartItems: CartItem[], cartItemToClear:CartItem):CartItem[] => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)


  export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>

  export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const setIsCartOpen = withMatcher((boolean:boolean): SetIsCartOpen => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean))

export const SetCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))

export const addItemToCart = (cartItems:CartItem[],productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return SetCartItems(newCartItems);
  };

export  const removeItemFromCart = (cartItemToRemove: CartItem, cartItems:CartItem[]) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return SetCartItems(newCartItems);
  };
 export const clearItemFromCart = (cartItemToClear: CartItem,cartItems:CartItem[]) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return SetCartItems(newCartItems);
  };