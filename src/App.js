import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
// Helps using multiple selectors
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// For authentification
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// Action...
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends Component {
  unsubscribeFromAuth = null;

  // Handles authentication and user persistance
  componentDidMount() {
    const { setCurrentUser } = this.props;

    /* Connection to Firebase is open as long as App component is mounted on DOM. Because it is open subscription, we need to CLOSE subscription when component unmounts (don't want memory leaks in application).
    ### 'unsubscribeFromAuth' will !!give back a function!!, which when called, will close the auth service subscription. Need to close it whenever component unmounts (use in 'componentWillUnmount').
    */
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // Getting back userRef object
        const userRef = await createUserProfileDocument(userAuth);

        /*
        Will need userRef to check if DB updated at that reference with any new data. Will get back a snapshot obj.
        # Will 'susbscribe' for this userRef, so it will listen for any changes.*/
        userRef.onSnapshot((snapShot) => {
          /*  From 'snapShot' obj. will get data (with .get()) related to this user.
          Whenever user snapShot updates, setting user.reducer with a new obj.*/
          setCurrentUser({
            id: snapShot.id,
            // Spreading data
            ...snapShot.data(),
          });
        });
      } else {
        // If userAuth object is null. When user loggs-out, current user will be set to null.
        setCurrentUser(userAuth);
      }
    });
  }

  // Will close Firebase auth subscription.
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        {/* When Route finds the match in the path, Switch makes sure that nothing else is rendered, but that ONE Route*/}
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          {/* If user is logged-in, he will be redirected and will not see SignInAndSignUpPage page */}
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

// Gets currentUser from Redux state and adds it to the props.
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  /*
  // In redux "dispatch" is the 'way' to pass an action obj. to the reducer.
  Will call action 'setCurrentUser' and will pass to it 'user'. Since 'setCurrentUser' returning the object, this obj. will be dispatched.
  */

  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

// Will connect App to the outcome of the initial 'connect' call using 'mapDispatchToProps'.
export default connect(mapStateToProps, mapDispatchToProps)(App);
