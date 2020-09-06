import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import Header from './components/header/header';
import 'normalize.css';
import './styles/style.scss';

document.addEventListener('scroll', () => {
  document.documentElement.dataset.scroll = window.scrollY;
});

ReactDOM.render(
  <Provider store={store().store}>
    <PersistGate loading={null} persistor={store().persistor}>
      <Header />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
