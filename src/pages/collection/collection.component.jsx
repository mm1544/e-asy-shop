import React from 'react';
import { connect } from 'react-redux';
import './collection.styles.scss';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop/shop.selectors';

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// Using second parameter 'ownProps' (!!), it is a props of a component (in this case - CollectionPage), which we are wrapping into 'connect'
const mapStateToProps = (state, ownProps) => ({
  // 'selectCollection' is a func. that returns a func., therefore we pass to that returned function a 'state'
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
