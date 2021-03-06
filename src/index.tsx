import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';

import App from './containers/App';
import { searchFilters, ui } from './reducers/index';

let networkInterface = createNetworkInterface({
    uri: 'http://127.0.0.1:5000/graphql',
});

networkInterface.use([{
  applyMiddleware(req: any, next: any) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }

    req.options.headers.authorization = `agent`;
    next();
  }
}]);

let client = new ApolloClient({
  networkInterface: networkInterface,
});

const store = createStore(
  combineReducers({
    searchFilters,
    ui,
    apollo: client.reducer(),
  }),
  {},
  compose(
      applyMiddleware(client.middleware()),
  )
);

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement,
);
