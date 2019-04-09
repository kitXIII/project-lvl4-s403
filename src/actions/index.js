import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const initState = createAction('STATE_INIT');
export const setErrorAlert = createAction('ERROR_ALERT_SET');
export const deleteErrorAlert = createAction('ERROR_ALERT_DELETE');
export const toggleMenu = createAction('MENU_TOGGLE');
export const addMessage = createAction('MESSAGE_ADD');

export const requestAddMessage = (message, channelId, socketId) => async (dispatch) => {
  try {
    const url = routes.messagesUrl(channelId);
    const response = await axios.post(url, { data: { attributes: message, socketId } });
    dispatch(addMessage({ message: response.data.data }));
  } catch (e) {
    dispatch(setErrorAlert({ error: 'Network error' }));
    throw e;
  }
};

export const setCurrentChannel = createAction('CURRENT_CHANNEL_SET');
export const addChannel = createAction('CHANNEL_ADD');
export const deleteChannel = createAction('CHANNEL_DELETE');

export const requestAddChannel = (name, socketId) => async (dispatch) => {
  try {
    const url = routes.channelsUrl();
    const response = await axios.post(url, { data: { attributes: { name }, socketId } });
    dispatch(addChannel({ channel: response.data.data }));
  } catch (e) {
    dispatch(setErrorAlert({ error: 'Network error' }));
    throw e;
  }
};

export const requestDeleteChannel = (id, socketId) => async (dispatch) => {
  try {
    const url = routes.channelUrl(id);
    await axios.delete(url, { data: { socketId } });
  } catch (e) {
    dispatch(setErrorAlert({ error: 'Network error' }));
    throw e;
  }
};
