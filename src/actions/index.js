import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const initState = createAction('INIT_STATE');

export const receivedNewMessage = createAction('RECEIVED_NEW_MESSAGE');

export const sendMessageRequest = createAction('SEND_MESSAGE_REQUEST');
export const sendMessageSuccess = createAction('SEND_MESSAGE_SUCCESS');
export const sendMessageFailure = createAction('SEND_MESSAGE_FAILURE');

export const sendMessage = (message, channelId) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const url = routes.messagesUrl(channelId);
    const response = await axios.post(url, { data: { attributes: message } });
    dispatch(receivedNewMessage({ message: response.data.data }));
    dispatch(sendMessageSuccess());
  } catch (e) {
    dispatch(sendMessageFailure());
    throw e;
  }
};
