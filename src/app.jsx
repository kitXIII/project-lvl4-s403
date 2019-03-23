import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import { initState } from './actions';
import App from './components/App';

// eslint-disable-next-line no-underscore-dangle
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();

const store = createStore(
  reducers,
  devtoolMiddleware,
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
