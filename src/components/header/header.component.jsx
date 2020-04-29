import React from 'react';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
// 'connect' is a higher order component, it modifies our component so to be able to access Redux state
import { connect } from 'react-redux';
// For authentication
import { auth } from '../../firebase/firebase.utils';
import './header.styles.scss';
// React syntax to import svg
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

const Header = ({ currentUser, hidden }) => {
  return (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        <Link className='option' to='#!'>
          CONTACT
        </Link>
        {/* In ternary operator, if 'currentUser' is an object, it will be evaluated to 'true'. 'null' evaluates to 'false'. */}
        {currentUser ? (
          <div className='option' onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className='option' to='/signin'>
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
};

// Function that allows to access the 'state', where the 'state' is our root-reducer.
const mapStateToProps = createStructuredSelector({
  // Selectors to memoize 'currentUser' and 'hidden'
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
