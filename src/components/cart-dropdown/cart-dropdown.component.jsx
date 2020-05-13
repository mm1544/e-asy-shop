import React from 'react';
// To get access to the Items in the 'cart'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// Helps using multiple selectors
import { createStructuredSelector } from 'reselect';
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';

const CartDropdown = ({ cartItems, history }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {cartItems.length ? (
        cartItems.map((item) => <CartItem key={item.id} item={item} />)
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )}
    </div>

    <CustomButton onClick={() => history.push('/checkout')}>
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  // Selector gives memoized value of 'cartItems'
  cartItems: selectCartItems,
});

/*
Higher order components take components as argument (and returns component). 'withRouter' takes a component that is returned from connect() call, as its argument. 'withRouter' will add match 'history' and location objects to the component that is being 'wraped'.
*/
export default withRouter(connect(mapStateToProps)(CartDropdown));
