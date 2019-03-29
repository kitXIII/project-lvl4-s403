import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import { initState, receivedNewMessage } from './actions';
import App from './components/App';
import { CurrentUserContext } from './contexts';

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default (data, mountPointId, username, socket) => {
  store.dispatch(initState({ data }));

  socket.on('connect', () => console.log('Connection established'));
  socket.on('newMessage', event => store.dispatch(receivedNewMessage({ message: event.data })));

  render(
    <Provider store={store}>
      <CurrentUserContext.Provider value={username}>
        <App />
      </CurrentUserContext.Provider>
    </Provider>,
    document.getElementById(mountPointId),
  );
};
