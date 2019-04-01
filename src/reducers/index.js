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
    return { byId: { ...byId, [id]: attributes }, allIds: [...allIds, id] };
  },
}, {});

const UIReducer = handleActions({
  [actions.toggleMenuCollapse]({ collapseMenuIsOpen }) {
    return { collapseMenuIsOpen: !collapseMenuIsOpen };
  },
  [actions.setCurrentChannel]() {
    return { collapseMenuIsOpen: false };
  },
}, { collapseMenuIsOpen: false });

export default combineReducers({
  currentChannelId: currentChannelReducer,
  channels: channelsReducer,
  messages: messagesReducer,
  form: formReducer,
  ui: UIReducer,
});
