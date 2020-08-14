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

// Moving Shop data to the Firebase. Takes in collection-name (collectionKEY) and obj. that we are going to add.
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // Creating collection. Firebase is giving back a ref obj.
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  /*
   To ensure that our code is consistent, we will use 'batch right'. It will group all our calls together into one big request. Firestore gives batch obj. With this obj. we will add all our 'set' to it and we will 'fire-off' when we will be done adding all the calls to it. 
   
   We will loop over 'objectsToAdd' array using forEach method. Recap: forEach doesn't return a NEW array (not like 'map'). 
  */
  const batch = firestore.batch();
  // Will loop through this array and 'batch' all the 'set' calls together.
  objectsToAdd.forEach((obj) => {
    /*
    To get a document at the empty string. Will give a new document-reference in this collection and will randomly generate an ID.
    */

    const newDockRef = collectionRef.doc();
    // Will set the value (obj). Will use 'batch' here.
    batch.set(newDockRef, obj);
  });

  // Will fire-off 'batch' call. 'batch.commit()' will return a promise. So when commit succeds it will 'come back' and will resolve a void value (null value).
  return await batch.commit();
};

// Will get the whole snapshot. Need to convert to an Obj. instead of array...
export const convertCollectionsSnapshotToMap = (collections) => {
  // 'docs' will give a query-snapshot array
  const transformedCollection = collections.docs.map((doc) => {
    // Will 'pull-out' title and items
    const { title, items } = doc.data();

    // 'encodeURI' is a JS method
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  // Will use 'reduce' fn. on transformedCollection array. Passing empty obj ({}) as initial accumulator.
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
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
