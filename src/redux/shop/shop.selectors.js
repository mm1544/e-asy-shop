import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// To convert an object to the array
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  // 'Object.keys' will get the feys of an object that is passed in, and returns them in the array
  (collections) => Object.keys(collections).map((key) => collections[key])
);

// Func. that returns a func.
export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  );
