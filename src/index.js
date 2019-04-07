import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';

import app from './app';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const setFakeUserCookie = () => {
  const name = faker.internet.userName();
  cookies.set('chat_user_name', name, { expires: 365 });
  return name;
};

const currentUser = cookies.get('chat_user_name') || setFakeUserCookie();

// eslint-disable-next-line no-restricted-globals
const socket = io(location.origin);
socket.on('connect', () => {
  app(gon, 'chat', currentUser, socket);
});
