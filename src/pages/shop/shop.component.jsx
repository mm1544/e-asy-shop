import React from 'react';
import { Route } from 'react-router-dom';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { connect } from 'react-redux';

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

// Importing action
import { updateCollections } from '../../redux/shop/shop.actions';

/*
In App.js, Route automatically passes to ShopPage component 'match', 'location' and 'history' objects as props.
*/
class ShopPage extends React.Component {
  // In this case the Snapshot is a Snapshot representation of our data collections array, that will be gotten from Firestore. That data will be fetched in componentDidMount method.
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');
    /*
    Meaning: 
      Whenever the collectionRef updates or when this codes is runned for the first time, this collectionRef will send us the snap-shot representing the code of collections-object's-array at the time this code renders...

      'collectionRef.onSnapshot()' will return the snapshot obj. of the collection
    */

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
      }
    );
  }
  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

// 'dispatch' is a fn.
const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
