import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const initState = createAction('INIT_STATE');
export const addNewMessage = createAction('ADD_NEW_MESSAGE');
export const setError = createAction('SET_ERROR');
export const deleteError = createAction('DELETE_ERROR');

export const sendMessage = (message, channelId) => async (dispatch) => {
  try {
    const url = routes.messagesUrl(channelId);
    const response = await axios.post(url, { data: { attributes: message } });
    dispatch(addNewMessage({ message: response.data.data }));
  } catch (e) {
    dispatch(setError({ error: 'Network error' }));
    setTimeout(() => dispatch(deleteError()), 10000);
    throw e;
  }
};

export const setCurrentChannel = createAction('SET_CURRENT_CHANNEL');
export const toggleMenuCollapse = createAction('TOGGLE_MENU_COLLAPSE');
