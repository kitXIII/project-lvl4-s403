import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const initState = createAction('INIT_STATE');

export const sendMessage = (message, channelId) => async (dispatch) => {
  try {
    const url = routes.messagesUrl(channelId);
    await axios.post(url, { data: { attributes: message } });
  } catch (e) {
    throw e;
  }
};

export const addNewMessage = createAction('ADD_NEW_MESSAGE');
export const setCurrentChannel = createAction('SET_CURRENT_CHANNEL');
export const toggleMenuCollapse = createAction('TOGGLE_MENU_COLLAPSE');
