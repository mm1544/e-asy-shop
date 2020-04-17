/*
Need to store data related to 'collections' on Shop page, therefore will use class component.
*/

import React, { Component } from 'react';
import SHOP_DATA from './shop.data';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';

class ShopPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Demo data.
      collections: SHOP_DATA,
    };
  }

  render() {
    const { collections } = this.state;
    return (
      <div className='shop-page'>
        {/* Rest operator */}
        {collections.map(({ id, ...otherCollectionProps }) => (
          <CollectionPreview
            key={id}
            // Spreading other props
            {...otherCollectionProps}
          />
        ))}
      </div>
    );
  }
}

export default ShopPage;
