import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import {
  initState, addMessage, addChannel, deleteChannelSuccess, showAlert,
} from './actions';
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

  socket.on('newMessage', event => store.dispatch(addMessage({ message: event.data })));
  socket.on('newChannel', event => store.dispatch(addChannel({ channel: event.data })));
  socket.on('removeChannel', (event) => {
    const { id } = event.data;
    const { channels: { byId } } = store.getState();
    const { name } = byId[id];
    store.dispatch(deleteChannelSuccess({ channelId: id }));
    showAlert('warning', `Channel "${name}" has been deleted`)(store.dispatch);
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
