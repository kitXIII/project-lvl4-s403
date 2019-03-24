import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { initState } from './actions';
import App from './components/App';

// eslint-disable-next-line no-underscore-dangle
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
const thunkMiddleware = applyMiddleware(thunk);

const store = createStore(
  reducers,
  compose(
    devtoolMiddleware,
    thunkMiddleware,
  ),
);

export default (data, mountPointId) => {
  store.dispatch(initState({ data }));
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById(mountPointId),
  );
};
