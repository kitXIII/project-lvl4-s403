import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const initState = createAction('INIT_STATE');
export const addNewMessage = createAction('ADD_NEW_MESSAGE');
export const setErrorAlert = createAction('SET_ERROR_ALERT');
export const deleteErrorAlert = createAction('DELETE_ERROR_ALERT');

export const sendMessage = (message, channelId) => async (dispatch) => {
  try {
    const url = routes.messagesUrl(channelId);
    const response = await axios.post(url, { data: { attributes: message } });
    dispatch(addNewMessage({ message: response.data.data }));
  } catch (e) {
    dispatch(setErrorAlert({ error: 'Network error' }));
    setTimeout(() => dispatch(deleteErrorAlert()), 5000);
    throw e;
  }
};

export const setCurrentChannel = createAction('SET_CURRENT_CHANNEL');
export const toggleMenuCollapse = createAction('TOGGLE_MENU_COLLAPSE');
