import React from 'react';
import { connect } from 'react-redux';
import './cart-icon.styles.scss';
// Helps using multiple selectors
import { createStructuredSelector } from 'reselect';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping_bag.svg';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  // It is an action from 'cart.actions'
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = createStructuredSelector({
  // Selector 'selectCartItemsCount' gives memoized value of 'itemCount'
  itemCount: selectCartItemsCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
