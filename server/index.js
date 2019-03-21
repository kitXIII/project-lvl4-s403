// @flow

import path from 'path';
import Koa from 'koa';
import Pug from 'koa-pug';
import socket from 'socket.io';
import http from 'http';
import mount from 'koa-mount';
import serve from 'koa-static';
import Router from 'koa-router';
import koaLogger from 'koa-logger';
import koaWebpack from 'koa-webpack';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import favicon from 'koa-favicon';
import _ from 'lodash';
import addRoutes from './routes';

import webpackConfig from '../webpack.config';

import container from './container';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;
const sessionKey1 = String(process.env.SESSION_SECRET_1);
const sessionKey2 = String(process.env.SESSION_SECRET_2);
const { logger } = container;
const log = logger('server:configuration:');

export default () => {
  const app = new Koa();
  app.keys = [sessionKey1, sessionKey2];
  app.use(session(app));
  app.use(bodyParser());
  app.use(favicon());
  // app.use(serve(path.join(__dirname, '..', 'public')));
  if (isDevelopment) {
    log('Dev mode, use webpack');
    koaWebpack({
      config: webpackConfig,
    }).then((middleware) => {
      app.use(middleware);
    });
  } else {
    log('Production or test mode, mount static');
    const urlPrefix = '/assets';
    const assetsPath = path.resolve(`${__dirname}/../dist/public`);
    // const assetsPath = path.resolve(`${__dirname}/../public`);
    app.use(mount(urlPrefix, serve(assetsPath)));
  }

  const router = new Router();

  app.use(koaLogger());
  const pug = new Pug({
    viewPath: path.join(__dirname, '..', 'views'),
    debug: true,
    pretty: true,
    compileDebug: true,
    locals: [],
    noCache: process.env.NODE_ENV !== 'production',
    basedir: path.join(__dirname, 'views'),
    helperPath: [
      { _ },
      { urlFor: (...args) => router.url(...args) },
    ],
  });
  pug.use(app);

  const server = http.createServer(app.callback());
  const io = socket(server);

  addRoutes(router, io, container);
  app.use(router.allowedMethods());
  app.use(router.routes());

  return server;
};
