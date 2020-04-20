import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore
  .collection('users')
  .doc('B0ATeRgRYkkXvOypaT5w')
  .collection('cartItems')
  .doc('BJ0aW8C2WJAal7t8FZsB');

// OR
firestore.doc('/users/B0ATeRgRYkkXvOypaT5w/cartItems/BJ0aW8C2WJAal7t8FZsB');
