import { createContext, useEffect, useReducer } from "react";

import { 
    onAuthStateChangedListener, createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
  const {type, payload} = action;

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
      default:
        throw new Error(`Unhandled type ${type} in userReducer`)
  }
}

const INITIAL_STATE = {
  currentUser: null
}
export const UserProvider = ({ children }) => {
    
    const [ {currentUser}, dispatch] = useReducer(userReducer)

    const setCurrentUser = (user) => {
      dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
    }
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
      const unSubcribe = onAuthStateChangedListener((user) => {
        if(user) {
            createUserDocumentFromAuth(user);
        }
        console.log(user);
        setCurrentUser(user);
      })
      return unSubcribe;
    }, []);

    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}