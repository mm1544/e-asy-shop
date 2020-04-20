import firebase from 'firebase/app';
// For database
import 'firebase/firestore';
// For auth
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA8uN0b5wxPo-f2jkZ2-bfPFLsVNy7FmTg',
  authDomain: 'e-asy-shop-db.firebaseapp.com',
  databaseURL: 'https://e-asy-shop-db.firebaseio.com',
  projectId: 'e-asy-shop-db',
  storageBucket: 'e-asy-shop-db.appspot.com',
  messagingSenderId: '225893732947',
  appId: '1:225893732947:web:985526b59c5cc08331aca6',
  measurementId: 'G-GQ5RZRR6XK',
};

firebase.initializeApp(config);

// Will be able to use 'auth' constant anywhere related to authentication
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Setting-up Google authentication utility. Gives an access to new GoogleAuthProvider class.
const provider = new firebase.auth.GoogleAuthProvider();
// Will trigger Google pop-up (there can be diferent pop-ups for twitter, facebook etc.) whenever will use GoogleAuthProvider for authentication and sign-in...
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// Exporting whole 'firebase' in case will need whole library.
export default firebase;

// Need to configure Firebase on its site to allow Google pop-ups...
