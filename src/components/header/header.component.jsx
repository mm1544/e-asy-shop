import React from 'react';
import { Link } from 'react-router-dom';
// 'connect' is a higher order component, it modifies our component so to be able to access Redux state
import { connect } from 'react-redux';
// For authentication
import { auth } from '../../firebase/firebase.utils';
import './header.styles.scss';
// React syntax to import svg
import { ReactComponent as Logo } from '../../assets/crown.svg';

const Header = ({ currentUser }) => {
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
      </div>
    </div>
  );
};

// Function that allows to access the 'state', where the 'state' is our root-reducer (!?)
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
