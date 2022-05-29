import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { 
        getAuth,
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAunL2ofsa-3w7wbql_knNZQJRTYP5vUxc",
    authDomain: "crwn-clothing-db-b7475.firebaseapp.com",
    projectId: "crwn-clothing-db-b7475",
    storageBucket: "crwn-clothing-db-b7475.appspot.com",
    messagingSenderId: "825339179513",
    appId: "1:825339179513:web:f42bedb71373bdc3c8cd28"
};
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot);
    console.log(userSnapShot.exists());

    if(!userSnapShot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};