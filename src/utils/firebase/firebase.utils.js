import { initializeApp } from 'firebase/app';
import { getAuth, 
         signInWithRedirect, 
         signInWithPopUp, 
         GoogleAuthProvider,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         signOut,
         onAuthStateChanged,
    } from 'firebase/auth';

import { getFirestore,doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBdSCdUB5WTsjm-zYVt1_L-MEtrj6QLAMA",
  authDomain: "crwn-clothing-db-5ac5f.firebaseapp.com",
  projectId: "crwn-clothing-db-5ac5f",
  storageBucket: "crwn-clothing-db-5ac5f.appspot.com",
  messagingSenderId: "900887700157",
  appId: "1:900887700157:web:3282909bff7cc49c700dd4"
};

const firebaseApp = initializeApp(firebaseConfig);

  const googleprovider = new GoogleAuthProvider();

  googleprovider.setCustomParameters({
    prompt: "select account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => 
    signInWithPopUp(auth, googleprovider);
  export const signInWithGoogleRedirect = () => 
    signInWithRedirect(auth, googleprovider);

  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
    ) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }

    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
  };

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
  };

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback )