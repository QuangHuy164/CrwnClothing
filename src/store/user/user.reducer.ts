import { USER_ACTION_TYPES } from "./user.types";
import {AnyAction} from 'redux'

import { SignInFailed, signUpFailed, signOutFailed, signOutSuccess, signInSuccess } from "./user.action";
  const INITIAL_STATE = {
    currentUser: null
  }
 export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
      const { type, payload} = action
      switch (type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
          return {...state, currenUser:payload}
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
          return {...state, currentUser: null}
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
          case USER_ACTION_TYPES.SIGN_IN_FAILED:
            case USER_ACTION_TYPES.SIGN_UP_FAILED:
              return {...state, error: payload}
        default:
          return state
    }
  }