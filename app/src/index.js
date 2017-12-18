import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import reducers from './reducers';
import './index.css';
import 'font-awesome/css/font-awesome.min.css'

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <AppContainer>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <App />
    </Provider>
  </AppContainer>
  , document.getElementById('root'));

registerServiceWorker();
