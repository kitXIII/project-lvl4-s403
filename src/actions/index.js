import axios from 'axios';
import { createAction } from 'redux-actions';
import { uniqueId } from 'lodash';
import routes from '../routes';

export const initState = createAction('STATE_INIT');
export const addAlert = createAction('ERROR_ALERT_SET');
export const deleteAlert = createAction('ERROR_ALERT_DELETE');
export const toggleMenu = createAction('MENU_TOGGLE');
export const addMessage = createAction('MESSAGE_ADD');

export const showAlert = (type, message) => (dispatch) => {
  const id = uniqueId();
  dispatch(addAlert({ alert: { id, type, message } }));
  setTimeout(() => dispatch(deleteAlert({ id })), 3000);
};

export const requestAddMessage = (message, channelId, socketId) => async (dispatch) => {
  try {
    const url = routes.messagesUrl(channelId);
    const response = await axios.post(url, { data: { attributes: message, socketId } });
    dispatch(addMessage({ message: response.data.data }));
  } catch (e) {
    showAlert('error', 'Network error');
    throw e;
  }
};

export const setCurrentChannel = createAction('CURRENT_CHANNEL_SET');
export const addChannel = createAction('CHANNEL_ADD');
export const deleteChannel = createAction('CHANNEL_DELETE');
export const openChannelDeletionDialog = createAction('CHANNEL_DELETION_DIALOG_OPEN');
export const closeChannelDeletionDialog = createAction('CHANNEL_DELETION_DIALOG_CLOSE');

export const requestAddChannel = (name, socketId) => async (dispatch) => {
  try {
    const url = routes.channelsUrl();
    const response = await axios.post(url, { data: { attributes: { name }, socketId } });
    dispatch(addChannel({ channel: response.data.data }));
  } catch (e) {
    showAlert('error', 'Network error');
    throw e;
  }
};

export const requestDeleteChannel = (channelId, socketId) => async (dispatch) => {
  try {
    const url = routes.channelUrl(channelId);
    await axios.delete(url, { data: { socketId } });
    dispatch(showAlert('success', 'Channel has been deleted'));
  } catch (e) {
    showAlert('error', 'Network error');
    throw e;
  }
};
