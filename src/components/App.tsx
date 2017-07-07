import * as React from 'react';
import './App.css';
import OfferingsSearch from '../containers/OfferingsSearch'
import OfferingsSearchResultList from '../containers/OfferingsSearchResultList'

const logo = require('../logo.svg');

function App (props) {
  console.log(props);

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>

      <OfferingsSearch onSubmit={ () => {} }/>
      <OfferingsSearchResultList offeringTypes={ props.searchParameters.offeringTypes } />
    </div>
  );
}

export default App;
