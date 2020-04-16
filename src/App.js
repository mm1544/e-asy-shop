import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => (
  <div className=''>
    <h1>HATS PAGE</h1>
  </div>
);

function App() {
  return (
    <div>
      {/* When Route finds the match in the path, Switch makes sure that nothing else is rendered, but that ONE Route*/}
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/hats' component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
