import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messageSendingState = handleActions({
  [actions.sendMessageRequest]() {
    return 'requested';
  },
  [actions.sendMessageFailure]() {
    return 'failed';
  },
  [actions.sendMessageSuccess]() {
    return 'successed';
  },
}, 'none');

const channelsReducer = handleActions({
  [actions.initState](state, { payload: { data } }) {
    const { channels, messages } = data;
    const allIds = channels.map(channel => channel.id);
    const byId = channels.reduce((acc, channel) => {
      const msgs = messages.filter(m => m.channelId === channel.id).map(m => m.id);
      return { ...acc, [channel.id]: { ...channel, messages: msgs } };
    }, {});
    return { byId, allIds };
  },
  [actions.sendMessageSuccess](state, { payload: { message } }) {
    const { byId, allIds } = state;
    const { data: { id, attributes: { channelId } } } = message;
    const channel = byId[channelId];
    if (channel.messages.includes(id)) {
      return state;
    }
    const messages = [...channel.messages, id];
    return { allIds, byId: { ...byId, [channelId]: { ...channel, messages } } };
  },
}, {});

const currentChannelReducer = handleActions({
  [actions.initState](state, { payload: { data } }) {
    const { currentChannelId } = data;
    return currentChannelId;
  },
}, null);

const messagesReducer = handleActions({
  [actions.initState](state, { payload: { data } }) {
    const { messages } = data;
    const allIds = messages.map(m => m.id);
    const byId = messages.reduce((acc, m) => ({ ...acc, [m.id]: m }), {});
    return { byId, allIds };
  },
  [actions.sendMessageSuccess](state, { payload: { message } }) {
    const { byId, allIds } = state;
    const { data: { id, attributes } } = message;
    if (allIds.includes(id)) {
      return state;
    }
    return { byId: { ...byId, [id]: attributes }, allIds: [...allIds, id] };
  },
}, {});

export default combineReducers({
  currentChannelId: currentChannelReducer,
  channels: channelsReducer,
  messages: messagesReducer,
  form: formReducer,
  messageSendingState,
});
