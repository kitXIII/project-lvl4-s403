import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const initState = createAction('INIT_STATE');
export const setErrorAlert = createAction('SET_ERROR_ALERT');
export const deleteErrorAlert = createAction('DELETE_ERROR_ALERT');
export const toggleMenuState = createAction('TOGGLE_MENU_STATE');
export const addNewMessage = createAction('ADD_NEW_MESSAGE');

export const sendMessage = (message, channelId) => async (dispatch) => {
  try {
    const url = routes.messagesUrl(channelId);
    const response = await axios.post(url, { data: { attributes: message } });
    dispatch(addNewMessage({ message: response.data.data }));
  } catch (e) {
    dispatch(setErrorAlert({ error: 'Network error' }));
    throw e;
  }
};

export const setCurrentChannel = createAction('SET_CURRENT_CHANNEL');
export const addNewChannel = createAction('ADD_NEW_CHANNEL');

export const createChannel = (name, socketId) => async (dispatch) => {
  try {
    const url = routes.channelsUrl();
    await axios.post(url, { data: { attributes: { name }, socketId } });
    // const response = await axios.post(url, { data: { attributes: { name } } });
    // dispatch(addNewChannel({ channel: response.data.data }));
  } catch (e) {
    dispatch(setErrorAlert({ error: 'Network error' }));
    throw e;
  }
};
