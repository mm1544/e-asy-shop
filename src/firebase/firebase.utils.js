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

// Will take 'userAuth' object (that we got back from 'auth' library) and store it inside of DB. Making API request therefore it is async function. 'additionalData' will be passed as an object.
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // If 'userAuth' object doesn't exist, then return from function.
  if (!userAuth) return;

  /*
  Using 'userAuth.uid'. Want to see if userAuth object, that we get from auth library, already exists in the database.

   First getting document reference object.
  */

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // ...then getting document snapshot object. It will allow us to decide whether there exist data
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    //To know when entry was made.
    const createdAt = new Date();

    // If doesn't exist, will create it. To create will use document reference object (userRef).
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        // Spreading anny other additional data
        ...additionalData,
      });
    } catch (err) {
      console.log('error creating user ', err.message);
    }
  }

  // Return 'userRef' obj. because userRef may be needed for later.
  return userRef;
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
