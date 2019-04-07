import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import { initState, addNewMessage, addNewChannel } from './actions';
import App from './components/App';
import { ConfigContext } from './context';

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default (data, mountPointId, currentUser, socket) => {
  store.dispatch(initState({ data }));

  // eslint-disable-next-line no-console
  socket.on('newMessage', event => store.dispatch(addNewMessage({ message: event.data })));

  socket.on('newChannel', (event) => {
    // store.dispatch(addNewChannel({ message: event.data }));
    console.log(event.data);
  });

  render(
    <Provider store={store}>
      <ConfigContext.Provider
        value={{
          currentUser,
          currentSocketId: socket.id,
        }}
      >
        <App />
      </ConfigContext.Provider>
    </Provider>,
    document.getElementById(mountPointId),
  );
};
