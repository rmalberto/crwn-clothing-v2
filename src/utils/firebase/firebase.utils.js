import { initializeApp } from 'firebase/app';
import { 
        getAuth,
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider
} from 'firebase/auth';

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
