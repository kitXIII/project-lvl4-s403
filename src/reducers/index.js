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
    const { channels } = data;
    const allIds = channels.map(channel => channel.id);
    const byId = channels.reduce((acc, channel) => ({ ...acc, [channel.id]: channel }), {});
    return { byId, allIds };
  },
}, {});

const currentChannelReducer = handleActions({
  [actions.initState](state, { payload: { data } }) {
    const { currentChannelId } = data;
    return currentChannelId;
  },
}, null);

export default combineReducers({
  currentChannelId: currentChannelReducer,
  channels: channelsReducer,
  form: formReducer,
  messageSendingState,
});
