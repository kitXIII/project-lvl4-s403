import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import { initState } from './actions';
import App from './components/App';

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk),
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
