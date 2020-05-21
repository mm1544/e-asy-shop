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
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )}
    </div>

    <CustomButton
      onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}
    >
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

'connect' passes 'dispatch' into component as a 'prop' (if we do not explicitly pass it to 'connect' as a second argument). Therefore it is not necessary to implement 'mapDispatchToProps' (!!)
*/
export default withRouter(connect(mapStateToProps)(CartDropdown));
