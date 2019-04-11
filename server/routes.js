import _ from 'lodash';
import Router from 'koa-router';

const getNextId = () => Number(_.uniqueId());

export default (router, io, container) => {
  const { logger } = container;
  const log = logger('routes:');

  const generalChannelId = getNextId();
  const randomChannelId = getNextId();

  const ioEmitWithoutSender = (eventName, data, senderSocketId) => {
    if (io.sockets.connected[senderSocketId]) {
      io.sockets.connected[senderSocketId].broadcast.emit(eventName, data);
      log(`Socket.IO broadcast emit without sender socket id: ${senderSocketId}`);
    } else {
      io.emit(eventName, data);
      log(`Fail Socket.IO broadcast emit without sender socket id: ${senderSocketId}`);
    }
  };

  const defaultState = {
    channels: [
      { id: generalChannelId, name: 'general', removable: false },
      { id: randomChannelId, name: 'random', removable: false },
    ],
    messages: [],
    currentChannelId: generalChannelId,
  };

  const state = { ...defaultState };

  const apiRouter = new Router();
  apiRouter
    .get('/channels', (ctx) => {
      log('channels list rquested');
      ctx.body = state.channels;
      ctx.status = 301;
    })
    .post('/channels', (ctx) => {
      const { data: { attributes: { name }, socketId } } = ctx.request.body;
      log(`channel "${name}" addition requested`);
      const channel = {
        name,
        removable: true,
        id: getNextId(),
      };
      state.channels.push(channel);
      ctx.status = 201;
      const data = {
        data: {
          type: 'channels',
          id: channel.id,
          attributes: channel,
        },
      };
      ctx.body = data;

      ioEmitWithoutSender('newChannel', data, socketId);
      log(`new channel has been added: ${JSON.stringify(data)}`);
    })
    .delete('/channels/:id', (ctx) => {
      const channelId = Number(ctx.params.id);
      const { socketId } = ctx.request.body;
      log(`channel (id: ${channelId}) deletion requested`);
      state.channels = state.channels.filter(c => c.id !== channelId);
      state.messages = state.messages.filter(m => m.channelId !== channelId);
      ctx.status = 204;
      const data = {
        data: {
          type: 'channels',
          id: channelId,
        },
      };
      ioEmitWithoutSender('removeChannel', data, socketId);
      log(`channel (id: ${channelId}) has been deleted`);
    })
    .patch('/channels/:id', (ctx) => {
      const channelId = Number(ctx.params.id);
      const channel = state.channels.find(c => c.id === channelId);

      const { attributes } = ctx.request.body.data;
      log(`requested channel (id: ${channelId}) change with attributes: ${JSON.stringify(attributes)}`);
      const oldName = channel.name;
      channel.name = attributes.name;
      ctx.status = 204;
      const data = {
        data: {
          type: 'channels',
          id: channelId,
          attributes: channel,
        },
      };
      io.emit('renameChannel', data);
      log(`сhannel (id: ${channelId}) renamed from ${oldName} to ${attributes.name}`);
    })
    .get('/channels/:channelId/messages', (ctx) => {
      const channelId = Number(ctx.params.channelId);
      const messages = state.messages.filter(m => m.channelId === channelId);
      log(`channel (id: ${channelId}) messages requested`);
      const resources = messages.map(m => ({
        type: 'messages',
        id: m.id,
        attributes: m,
      }));
      ctx.body = resources;
      log(`channel (id: ${channelId}), prepared a response with number of messages: ${resources.length}`);
    })
    .post('/channels/:channelId/messages', (ctx) => {
      const channelId = Number(ctx.params.channelId);
      log(`channel (id: ${channelId}), new message`);
      const { data: { attributes, socketId } } = ctx.request.body;
      const message = {
        ...attributes,
        channelId: Number(ctx.params.channelId),
        id: getNextId(),
      };
      state.messages.push(message);
      ctx.status = 201;
      const data = {
        data: {
          type: 'messages',
          id: message.id,
          attributes: message,
        },
      };
      ctx.body = data;
      ioEmitWithoutSender('newMessage', data, socketId);
      log(`new message in channel (id: ${channelId}): ${JSON.stringify(data)}`);
    });

  return router
    .get('root', '/', (ctx) => {
      ctx.render('index', { gon: state });
    })
    .use('/api/v1', apiRouter.routes(), apiRouter.allowedMethods());
};
