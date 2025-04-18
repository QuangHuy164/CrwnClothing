import { takeLatest, put, all, call } from "typed-redux-saga";
import {User} from 'firebase/auth'
import { USER_ACTION_TYPES } from "./user.types";
import {
    signInSuccess,
    signInFailed,
    signUpSuccess,
    signUpFailed,
    signOutSuccess,
    signOutFailed,
    EmailSignInStart,
    SignUpStart,
    SignUpSuccess,
  } from './user.action';
  
  import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    AdditionalInformation,
  } from '../../utils/firebase/firebase.utils';