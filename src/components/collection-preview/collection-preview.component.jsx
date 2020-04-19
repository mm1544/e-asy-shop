import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items }) => {
  return (
    <div className='collection-preview'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <div className='preview'>
        {/* Will be called whenever the component gets re-renderd and may slow down the preformance */}
        {items
          // To pre-view only first 4 items
          .filter((item, idx) => idx < 4)
          .map(({ id, ...otherItemProps }) => (
            <CollectionItem key={id} {...otherItemProps} />
          ))}
      </div>
    </div>
  );
};

export default CollectionPreview;