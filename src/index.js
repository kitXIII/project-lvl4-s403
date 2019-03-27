import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
// import io from 'socket.io-client';

import app from './app';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const username = cookies.get('chat_user_name') || faker.internet.userName();
cookies.set('chat_user_name', username, { expires: 365 });

app(gon, 'chat', username);
