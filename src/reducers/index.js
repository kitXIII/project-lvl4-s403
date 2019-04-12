import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import { keyBy, omit, omitBy } from 'lodash';
import * as actions from '../actions';

const channelsReducer = handleActions({
  [actions.initState](state, { payload: { data: { channels } } }) {
    const allIds = channels.map(c => c.id);
    const byId = keyBy(channels, c => c.id);
    return { byId, allIds };
  },
  [actions.addChannel](state, { payload: { channel } }) {
    const { byId, allIds } = state;
    const { id, attributes } = channel;
    const newAllIds = [...allIds, id].sort((a, b) => a - b);
    return { byId: { ...byId, [id]: attributes }, allIds: newAllIds };
  },
  [actions.deleteChannelSuccess](state, { payload: { channelId } }) {
    const { byId, allIds } = state;
    const newAllIds = [...allIds].filter(id => id !== channelId);
    const newById = omit(byId, channelId);
    return { byId: newById, allIds: newAllIds };
  },
}, { byId: {}, allIds: [] });

const currentChannelReducer = handleActions({
  [actions.initState](state, { payload: { data: { currentChannelId } } }) {
    return { value: currentChannelId, defaultValue: currentChannelId };
  },
  [actions.setCurrentChannel](state, { payload: { id } }) {
    return { ...state, value: id };
  },
  [actions.deleteChannelSuccess](state, { payload: { channelId } }) {
    const { value, defaultValue } = state;
    if (value === channelId) {
      return { ...state, value: defaultValue };
    }
    return state;
  },
}, {});

const messagesReducer = handleActions({
  [actions.initState](state, { payload: { data: { messages } } }) {
    const allIds = messages.map(m => m.id);
    const byId = keyBy(messages, m => m.id);
    return { byId, allIds };
  },
  [actions.addMessage](state, { payload: { message } }) {
    const { byId, allIds } = state;
    const { id, attributes } = message;
    const newAllIds = [...allIds, id].sort((a, b) => a - b);
    return { byId: { ...byId, [id]: attributes }, allIds: newAllIds };
  },
  [actions.deleteChannelSuccess](state, { payload: { channelId } }) {
    const { byId, allIds } = state;
    const newAllIds = [...allIds].filter(id => byId[id].channelId !== channelId);
    const newById = omitBy(byId, c => c.channelId === channelId);
    return { byId: newById, allIds: newAllIds };
  },
}, { byId: {}, allIds: [] });

const uiCollapseMenuReducer = handleActions({
  [actions.toggleMenu]({ isOpen }) {
    return { isOpen: !isOpen };
  },
  [actions.setCurrentChannel]() {
    return { isOpen: false };
  },
}, { isOpen: false });

const alertsReducer = handleActions({
  [actions.addAlert](state, { payload: { alert } }) {
    const { byId, allIds } = state;
    const { id } = alert;
    return { byId: { ...byId, [id]: alert }, allIds: [...allIds, id] };
  },
  [actions.deleteAlert](state, { payload: { id } }) {
    const { byId, allIds } = state;
    const newAllIds = [...allIds].filter(alertId => id !== alertId);
    const newById = omit(byId, id);
    return { byId: newById, allIds: newAllIds };
  },
}, { byId: {}, allIds: [] });

const currentlyDeletedChannelReducer = handleActions({
  [actions.openChannelDeletionDialog](state, { payload: { id } }) {
    return { id };
  },
}, {});

const uiChannelDeletionModalReducer = handleActions({
  [actions.openChannelDeletionDialog]() {
    return { show: true };
  },
  [actions.closeChannelDeletionDialog]() {
    return { show: false };
  },
}, { show: false });

const channelDeletionStateReducer = handleActions({
  [actions.openChannelDeletionDialog]() {
    return 'prepare';
  },
  [actions.deleteChannelRequest]() {
    return 'pending';
  },
  [actions.deleteChannelSuccess]() {
    return 'success';
  },
  [actions.deleteChannelFailure]() {
    return 'fail';
  },
  [actions.closeChannelDeletionDialog]() {
    return 'init';
  },
}, 'init');

export default combineReducers({
  currentChannelId: currentChannelReducer,
  channels: channelsReducer,
  messages: messagesReducer,
  form: formReducer,
  alerts: alertsReducer,
  channelDeletionState: channelDeletionStateReducer,
  currentlyDeletedChannel: currentlyDeletedChannelReducer,
  uiCollapseMenu: uiCollapseMenuReducer,
  uiChannelDeletionModal: uiChannelDeletionModalReducer,
});
