import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
<<<<<<< HEAD
  signInWithEmailAndPassword
=======
  signInWithEmailAndPassword,
>>>>>>> 03311ba859127deee43dad5f5b598dca31507bb4
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAunL2ofsa-3w7wbql_knNZQJRTYP5vUxc",
  authDomain: "crwn-clothing-db-b7475.firebaseapp.com",
  projectId: "crwn-clothing-db-b7475",
  storageBucket: "crwn-clothing-db-b7475.appspot.com",
  messagingSenderId: "825339179513",
  appId: "1:825339179513:web:f42bedb71373bdc3c8cd28"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);  
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
<<<<<<< HEAD
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);  
};
=======
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
>>>>>>> 03311ba859127deee43dad5f5b598dca31507bb4
