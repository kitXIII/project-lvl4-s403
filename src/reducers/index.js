import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

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
});
