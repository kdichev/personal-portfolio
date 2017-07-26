import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { combineReducers } from 'redux'
import counter from './reducers/counter'

// Combine all application reducers
const appStore = combineReducers({
  counter,
})


// Store configuration
const loggerMiddleware = createLogger()
let store = createStore(
  appStore,
  // only for dev
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    loggerMiddleware
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
