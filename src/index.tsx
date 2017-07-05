import * as React from "react"
import * as ReactDOM from "react-dom"

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';

import App from './App';

let client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://127.0.0.1:5000/graphql'
  })
})

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
  }),
  { },
  compose(
      applyMiddleware(client.middleware()),
  )
);

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement,
)
