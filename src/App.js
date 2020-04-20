import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// For authentification
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

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

    // 'unsubscribeFromAuth' will !!give back a function!!, which when called, will close the auth service subscription. Need to close it whenever component unmounts (use in 'componentWillUnmount').
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // Getting back userRef object
        const userRef = await createUserProfileDocument(userAuth);

        //Will need userRef to check if DB updated at that reference with any new data. Will get back a snapshot obj.
        // Will 'susbscribe' for this userRef, so itwill listen for any changes.
        userRef.onSnapshot((snapShot) => {
          /*  From 'snapShot' obj. will get data (with .get()) related to this user. setSate is async f. */
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                // Spreading data (snapShot just represents values, but it is not the data)
                ...snapShot.data(),
              },
            },
            () => console.log(this.state)
          );
        });
        // console.log(this.state);
      } else {
        // If userAuth object is null. When user loggs-out, current user will be set to null.
        this.setState({ currentUser: userAuth });
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
