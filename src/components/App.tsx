import * as React from 'react';
import './App.css';

import OfferingsSearchProvider from '../containers/OfferingSearchProvider';
import OfferingsSearch from '../containers/OfferingsSearch';
import OfferingsSearchResultList from '../containers/OfferingsSearchResultList';

const logo = require('../logo.svg');

function App (props) {
  console.log("App Render");

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>

      <OfferingsSearchProvider>
        <OfferingsSearch />
        <OfferingsSearchResultList />
      </OfferingsSearchProvider>
    </div>
  );
}

export default App;
