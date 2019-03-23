import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import gon from 'gon';
// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

import app from './app';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

app(gon, 'chat');
