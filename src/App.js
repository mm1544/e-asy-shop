import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// For authentification
import { auth } from './firebase/firebase.utils';

class App extends Component {
  /* Need to store a state of a user in app, so when user loggs-in (witg Google or email+password), need to store that user on the app state. It will allow to pass to other components. Want to be able to access current user's object through-out the app. */
  constructor() {
    super();

    this.state = { currentUser: null };
  }

  unsubscribeFromAuth = null;

  // Handles authentication and user persistance
  componentDidMount() {
    /* Connection to Firebase is open as long as App component is mounted on DOM. Because it is open subscription, we need to CLOSE subscription when component unmounts (don't want memory leaks in application). Passing a user state as a parameter. */

    // 'unsubscribeFromAuth' will !!give back a function!!, which when will be called, will close the auth service subscription. Need to close it whenever component unmounts (use in 'componentWillUnmount').
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  }

  // Will close Firebase auth subscription.
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        {/* When Route finds the match in the path, Switch makes sure that nothing else is rendered, but that ONE Route*/}
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
