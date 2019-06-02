import axios from 'axios';
import { createAction } from 'redux-actions';
import { uniqueId } from 'lodash';
import { SubmissionError } from 'redux-form';

import routes from '../routes';
import logger from '../../lib/bin/logger';

const log = logger('action:');
const errLog = logger('error:action:');

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
    log(`request: add message: ${JSON.stringify(message)}`);
    const response = await axios.post(url, { data: { attributes: message, socketId } });
    dispatch(addMessage({ message: response.data.data }));
    log(`add message response satus: ${response.status}`);
  } catch (e) {
    showAlert('error', 'Network error');
    errLog(`add message error: ${e.message}`);
  }
};

export const setCurrentChannel = createAction('CURRENT_CHANNEL_SET');
export const addChannel = createAction('CHANNEL_ADD');
export const openChannelDeletionDialog = createAction('CHANNEL_DELETION_DIALOG_OPEN');
export const closeChannelDeletionDialog = createAction('CHANNEL_DELETION_DIALOG_CLOSE');
export const deleteChannelRequest = createAction('CHANNEL_DELETE_REQUEST');
export const deleteChannelSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const deleteChannelFailure = createAction('CHANNEL_DELETE_FAILURE');

export const requestAddChannel = (name, socketId) => async (dispatch) => {
  try {
    const url = routes.channelsUrl();
    log(`request: add channel: ${name}`);
    const response = await axios.post(url, { data: { attributes: { name }, socketId } });
    dispatch(addChannel({ channel: response.data.data }));
    log(`add channel response satus: ${response.status}`);
  } catch (e) {
    showAlert('error', 'Network error');
    errLog(`add channel error: ${e.message}`);
  }
};

export const requestDeleteChannel = (channelId, socketId) => async (dispatch) => {
  dispatch(deleteChannelRequest());
  const url = routes.channelUrl(channelId);
  try {
    log(`request: delete channel by id: ${channelId}`);
    const response = await axios.delete(url, { data: { socketId } });
    dispatch(deleteChannelSuccess({ channelId }));
    log(`delete channel response satus: ${response.status}`);
  } catch (e) {
    dispatch(deleteChannelFailure());
    errLog(`delete channel error: ${e.message}`);
  }
};

export const openChannelUpdatingDialog = createAction('CHANNEL_UPDATING_DIALOG_OPEN');
export const closeChannelUpdatingDialog = createAction('CHANNEL_UPDATING_DIALOG_CLOSE');
export const updateChannel = createAction('CHANNEL_UPDATE');

export const requestUpdateChannel = (id, attributes, socketId) => async (dispatch) => {
  const url = routes.channelUrl(id);
  try {
    log(`request: update channel by id: ${id}, new values: ${JSON.stringify(attributes)}`);
    const response = await axios.patch(url, { data: { attributes }, socketId });
    dispatch(updateChannel({ channel: { id, attributes } }));
    log(`update channel response satus: ${response.status}`);
  } catch (e) {
    errLog(`update channel error: ${e.message}`);
    throw new SubmissionError({ _error: e.message });
  }
};
