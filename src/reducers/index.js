import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import { keyBy } from 'lodash';
import * as actions from '../actions';

const channelsReducer = handleActions({
  [actions.initState](state, { payload: { data: { channels } } }) {
    const allIds = channels.map(c => c.id);
    const byId = keyBy(channels, c => c.id);
    return { byId, allIds };
  },
  [actions.addNewChannel](state, { payload: { channel } }) {
    const { byId, allIds } = state;
    const { id, attributes } = channel;
    const newAllIds = [...allIds, id].sort((a, b) => a - b);
    return { byId: { ...byId, [id]: attributes }, allIds: newAllIds };
  },
}, {});

const currentChannelReducer = handleActions({
  [actions.initState](state, { payload: { data: { currentChannelId } } }) {
    return currentChannelId;
  },
  [actions.setCurrentChannel](state, { payload: { id } }) {
    return id;
  },
}, null);

const messagesReducer = handleActions({
  [actions.initState](state, { payload: { data: { messages } } }) {
    const allIds = messages.map(m => m.id);
    const byId = keyBy(messages, m => m.id);
    return { byId, allIds };
  },
  [actions.addNewMessage](state, { payload: { message } }) {
    const { byId, allIds } = state;
    const { id, attributes } = message;
    const newAllIds = [...allIds, id].sort((a, b) => a - b);
    return { byId: { ...byId, [id]: attributes }, allIds: newAllIds };
  },
}, {});

const uiCollapseMenuReducer = handleActions({
  [actions.toggleMenuState]({ isOpen }) {
    return { isOpen: !isOpen };
  },
  [actions.setCurrentChannel]() {
    return { isOpen: false };
  },
}, { isOpen: false });

const alertReducer = handleActions({
  [actions.setErrorAlert](state, { payload: { error } }) {
    return { show: true, message: error };
  },
  [actions.deleteErrorAlert]() {
    return { show: false, message: '' };
  },
}, { show: false, message: '' });

export default combineReducers({
  currentChannelId: currentChannelReducer,
  channels: channelsReducer,
  messages: messagesReducer,
  form: formReducer,
  alert: alertReducer,
  uiCollapseMenu: uiCollapseMenuReducer,
});
